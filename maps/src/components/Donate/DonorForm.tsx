import React from 'react';
import { DonorInfo } from './data/types';

interface DonorFormProps {
  donorInfo: DonorInfo;
  onChange: (field: keyof DonorInfo, value: string | boolean) => void;
}

const DonorForm: React.FC<DonorFormProps> = ({ donorInfo, onChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Your Information</h2>
      <div className="card bg-base-100 shadow-md border border-gray-200">
        <div className="card-body p-6">
          <div className="form-control mb-4">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                className="checkbox checkbox-primary mr-2"
                checked={donorInfo.isAnonymous}
                onChange={(e) => onChange('isAnonymous', e.target.checked)}
              />
              <span className="label-text">Make this donation anonymous</span>
            </label>
          </div>

          {!donorInfo.isAnonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  value={donorInfo.firstName}
                  onChange={(e) => onChange('firstName', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                  value={donorInfo.lastName}
                  onChange={(e) => onChange('lastName', e.target.value)}
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  value={donorInfo.email}
                  onChange={(e) => onChange('email', e.target.value)}
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Address (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered"
                  value={donorInfo.address || ''}
                  onChange={(e) => onChange('address', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">City (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="input input-bordered"
                  value={donorInfo.city || ''}
                  onChange={(e) => onChange('city', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Postal Code (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="input input-bordered"
                  value={donorInfo.postalCode || ''}
                  onChange={(e) => onChange('postalCode', e.target.value)}
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Country (Optional)</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={donorInfo.country || ''}
                  onChange={(e) => onChange('country', e.target.value)}
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorForm;