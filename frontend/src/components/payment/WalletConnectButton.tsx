"use client";

import React, { useState, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import type { WalletName, WalletAdapter } from "@solana/wallet-adapter-base";
import styles from "./WalletConnectButton.module.css";

interface AvailableWallet {
  name: string;
  icon: string;
  ready: boolean;
  adapter: WalletAdapter;
}

const WalletConnectButton: React.FC = () => {
  const {
    select,
    connect,
    connected,
    connecting,
    disconnecting,
    publicKey,
    wallets,
    wallet: selectedWallet,
    disconnect,
  } = useWallet();

  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [showWalletOptions, setShowWalletOptions] = useState<boolean>(false);
  const [isAttemptingConnect, setIsAttemptingConnect] =
    useState<boolean>(false);

  // Get available wallet adapters
  const availableWallets: AvailableWallet[] = useMemo(() => {
    return wallets.map((wallet) => ({
      name: wallet.adapter.name,
      icon: wallet.adapter.icon,
      ready:
        wallet.readyState === WalletReadyState.Installed ||
        wallet.readyState === WalletReadyState.Loadable,
      adapter: wallet.adapter,
    }));
  }, [wallets]);

  // Direct connection handler with logging
  const handleSelectWallet = async (walletName: string): Promise<void> => {
    try {
      console.log(`Attempting to select wallet: ${walletName}`);
      setConnectionError(null);
      setIsAttemptingConnect(true);

      // Find the wallet adapter
      const walletAdapter = wallets.find((w) => w.adapter.name === walletName);

      if (!walletAdapter) {
        throw new Error(`Wallet ${walletName} not found`);
      }

      console.log(
        `Wallet adapter found: ${walletAdapter.adapter.name}, ready state: ${walletAdapter.readyState}`
      );

      // First select the wallet
      await select(walletName as WalletName);
      console.log(`Selected wallet: ${walletName}`);

      // Then explicitly connect
      await connect();
      console.log(`Connected to wallet: ${walletName}`);

      setShowWalletOptions(false);
    } catch (error: unknown) {
      console.error("Failed to connect to wallet:", error);
      setConnectionError(
        `Connection error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsAttemptingConnect(false);
    }
  };

  // Handle initial button click
  const handleConnect = (): void => {
    setConnectionError(null);
    setShowWalletOptions(true);
  };

  // Handle disconnect and change wallet
  const handleChangeWallet = async (): Promise<void> => {
    try {
      await disconnect();
      setShowWalletOptions(true);
    } catch (error: unknown) {
      console.error("Failed to disconnect:", error);
      setConnectionError("Failed to disconnect current wallet");
    }
  };

  return (
    <div className={styles.walletButtonContainer}>
      {!connected ? (
        showWalletOptions ? (
          <div className={styles.walletSelectionContainer}>
            <div className={styles.walletSelectionTitle}>Select a wallet:</div>
            {availableWallets.map((wallet) => (
              <button
                key={wallet.name}
                className={styles.walletOption}
                onClick={() => handleSelectWallet(wallet.name)}
                disabled={isAttemptingConnect || !wallet.ready}
                type="button"
              >
                {wallet.icon && (
                  <img
                    src={wallet.icon}
                    alt={`${wallet.name} icon`}
                    className={styles.walletIcon}
                  />
                )}
                {wallet.name}
                {!wallet.ready && (
                  <span className={styles.notInstalled}> (Not installed)</span>
                )}
              </button>
            ))}
            <button
              className={styles.cancelButton}
              onClick={() => setShowWalletOptions(false)}
              disabled={isAttemptingConnect}
              type="button"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className={styles.customWalletButton}
            onClick={handleConnect}
            disabled={connecting || disconnecting}
            type="button"
          >
            {connecting ? "Connecting..." : "Connect Wallet"}
          </button>
        )
      ) : (
        <div className={styles.connectedWalletInfo}>
          <div className={styles.connectedStatus}>
            <span className={styles.walletName}>
              {selectedWallet?.adapter?.name || "Wallet"}:
            </span>
            {publicKey?.toString().slice(0, 4)}...
            {publicKey?.toString().slice(-4)}
          </div>

          <button
            className={styles.changeWalletButton}
            onClick={handleChangeWallet}
            disabled={disconnecting}
            type="button"
          >
            Change Wallet
          </button>
        </div>
      )}

      {(connecting || isAttemptingConnect) && (
        <div className={styles.connectingStatus}>Connecting to wallet...</div>
      )}

      {connectionError && (
        <div className={styles.errorMessage}>{connectionError}</div>
      )}

      {/* Debug info - can be removed in production */}
      <div className={styles.debugInfo}>
        Status:{" "}
        {connecting ? "Connecting" : connected ? "Connected" : "Disconnected"}
        {selectedWallet && ` to ${selectedWallet.adapter.name}`}
      </div>
    </div>
  );
};

export default WalletConnectButton;
