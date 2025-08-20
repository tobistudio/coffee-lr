import { Container } from '@app/components/common/container';
import Hero from '@app/components/sections/Hero';
import { getMergedPageMeta } from '@libs/util/page';
import type { LoaderFunctionArgs, MetaFunction } from 'react-router';

const locations: LocationProps[] = [
  {
    title: 'Lavender Hill Springs Coffee Roastery',
    addressLines: ['280 Red Hill Center Rd', 'Lawrenceburg, TN 38464'],
    phone: '(615) 669-3398',
    hours: ['Online Orders — Available 24/7', 'Customer Service — Mon-Fri 9am-5pm'],
    imageUrl: '/assets/images/location-1.png',
  },
];

export const loader = async (args: LoaderFunctionArgs) => {
  return {};
};

export const meta: MetaFunction<typeof loader> = getMergedPageMeta;

type LocationProps = {
  title: string;
  hours: string[];
  phone: string;
  addressLines: string[];
  imageUrl: string;
};

const Location = ({ title, addressLines, phone, hours, imageUrl }: LocationProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 text-xl">
      <div className="w-full h-full flex items-center justify-center col-span-2">
        <div
          className="bg-cover bg-no-repeat bg-center w-full rounded-3xl h-72"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
      </div>

      <div className="flex flex-col gap-4 col-span-1 md:justify-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div>
          {addressLines.map((line) => (
            <p>{line}</p>
          ))}
          <p>p. {phone}</p>
        </div>
        <div>
          <h4 className="font-bold">Hours</h4>
          {hours.map((hour) => (
            <p>{hour}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function IndexRoute() {
  return (
    <>
      <Container className="!px-0 py-0 sm:!p-16">
        <Hero
          className="min-h-[400px] !max-w-full bg-accent-50 sm:rounded-3xl p-6 sm:p-10 md:p-[88px] md:px-[88px]"
          content={
            <div className="text-center w-full space-y-9">
              <h4 className="text-lg md:text-2xl font-italiana tracking-wider">ABOUT US</h4>
              <h1 className="text-4xl md:text-8xl font-italiana tracking-wider [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                Our Story
              </h1>
              <p className="mx-auto text-md md:text-2xl !leading-normal">
                At Lavender Hill Springs Coffee, we're more than just a coffee business—we're a community. Inspired by the
                natural beauty of Tennessee's rolling hills and the warmth of southern hospitality, we aim to
                bring that sense of belonging and comfort to every cup of coffee we roast. From the moment we started,
                our passion has been to create exceptional coffee that{' '}
                <span className="font-bold">brings people together, one sip at a time.</span>
              </p>
            </div>
          }
          actionsClassName="!flex-row w-full justify-center !font-base"
          actions={[
            {
              label: 'Shop Our Coffee',
              url: '/products',
            },
            {
              label: 'Join the Lavender Hill Springs Community',
              url: '#',
            },
          ]}
        />
      </Container>

      <Container className="pt-4 flex flex-col gap-16 py-0 sm:!px-16 pb-44">
        <div className="font-italiana text-4xl break-words md:text-6xl lg:text-7xl">
          Find your people, find your <span className="font-ballet text-[150%] leading-tight">Lavender Hill Springs</span>
        </div>
        {locations.map((location) => (
          <Location {...location} />
        ))}
      </Container>
    </>
  );
}
