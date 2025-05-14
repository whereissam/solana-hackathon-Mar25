import { Heart, MapPin } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'

import NavMenu from '#components/common/NavMenu'
import { AppConfig } from '#lib/AppConfig'

const Home = () => (
  <div className="container mx-auto max-w-2xl p-3 max-md:max-w-none">
    <Head>
      <title>Unify Compass - Connect with charitable organizations on the map</title>
      <meta
        property="og:title"
        content="Unify Compass - Connect with charitable organizations on the map"
        key="title"
      />
      <meta
        name="description"
        content="Unify Compass helps you discover and support charitable organizations through an interactive map interface. Find and connect with causes you care about."
      />
    </Head>
    <header className="items-top mt-10 gap-4 md:flex">
      <span className="text-primary">
        <Heart size={AppConfig.ui.bigIconSize} className="mt-2" />
      </span>
      <div>
        <h2 className="text-4xl font-bold">Unify Compass</h2>
        <h3 className="mb-16 text-3xl">Mapping compassion worldwide</h3>
      </div>
    </header>
    <section>
      <p className="mb-2">
        <span>Unify Compass connects donors with charitable organizations through interactive maps. Find causes you care about based on location, category, and impact. Powered by </span>
        <Link className="text-primary" target="_blank" href="https://nextjs.org/">
          Next.js
        </Link>
        <span> and </span>
        <Link className="text-primary" target="_blank" href="https://react-leaflet.js.org/">
          React Leaflet
        </Link>
        <span>, our platform makes charitable giving more accessible and transparent. </span>
        <MapPin className="inline h-4 w-4" />
        <span> Discover charities near you today!</span>
      </p>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <h3 className="my-5 text-xl">Explore Our Platform</h3>
        <NavMenu />
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="mb-4 rounded-lg bg-primary-50 p-4 text-center">
          <h4 className="mb-2 font-semibold">Featured Categories</h4>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-primary-100 px-3 py-1">Education</span>
            <span className="rounded-full bg-primary-100 px-3 py-1">Healthcare</span>
            <span className="rounded-full bg-primary-100 px-3 py-1">Environment</span>
            <span className="rounded-full bg-primary-100 px-3 py-1">Humanitarian</span>
          </div>
        </div>
        <Link href="/charities" className="rounded bg-primary px-6 py-2 text-white hover:bg-primary-dark">
          View Charity Map
        </Link>
      </div>
    </section>
    <footer className="mt-16 flex justify-between rounded bg-light p-3 text-sm">
      <div>
        {new Date().getFullYear()}, Unify Compass <br />
        <Link
          href="/about"
          className="text-primary"
        >
          About Our Mission
        </Link>
      </div>
      <div className="text-primary">
        <Heart size={AppConfig.ui.mapIconSize} className="mt-2" />
      </div>
    </footer>
  </div>
)

export default Home
