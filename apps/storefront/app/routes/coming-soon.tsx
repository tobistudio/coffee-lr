import { ActionList } from '@app/components/common/actions-list/ActionList';
import { Container } from '@app/components/common/container';
import Hero from '@app/components/sections/Hero';
import { getMergedPageMeta } from '@libs/util/page';
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from 'react-router';
import { Form, json, redirect, useActionData } from 'react-router';
import { useState } from 'react';

export const loader = async (args: LoaderFunctionArgs) => {
  return {};
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // For now, just log the contact form submission
  // In production, you would send this to your backend or email service
  console.log('Contact form submission:', { name, email, message });

  // TODO: Connect to actual email service or backend
  return json({ success: true, message: 'Thank you for your interest! We\'ll be in touch soon.' });
};

export const meta: MetaFunction<typeof loader> = getMergedPageMeta;

export default function ComingSoonRoute() {
  const actionData = useActionData<typeof action>();
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <>
      <Hero
        className="h-screen !max-w-full -mt-[calc(var(--mkt-header-height)+3rem)] md:-mt-[calc(var(--mkt-header-height-desktop)+2rem)] pt-[var(--mkt-header-height)] md:pt-[var(--mkt-header-height-desktop)]"
        content={
          <div className="text-center w-full space-y-8 max-w-4xl mx-auto">
            <h4 className="font-italiana text-2xl md:text-3xl text-white/90">COMING SOON</h4>
            <h1 className="text-5xl md:text-8xl font-aboreto text-white">LAVENDER HILL SPRINGS</h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed">
              We're crafting something special for coffee lovers everywhere. 
              Our artisan-roasted coffee will be available soon, bringing community and exceptional flavor to your door.
            </p>
            
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mt-12 max-w-lg mx-auto">
              <h3 className="text-2xl font-italiana text-white mb-6">Get Notified When We Launch</h3>
              
              {actionData?.success ? (
                <div className="text-green-300 text-center p-4 bg-green-900/20 rounded-lg">
                  {actionData.message}
                </div>
              ) : (
                <Form method="post" className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Tell us about your coffee preferences (optional)"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-white text-gray-900 font-semibold rounded-lg hover:bg-white/90 transition-colors duration-200"
                  >
                    Notify Me
                  </button>
                </Form>
              )}
            </div>

            <div className="text-white/70 text-sm">
              Follow our journey • Artisan Coffee • Community Focused
            </div>
          </div>
        }
        image={{
          url: '/assets/images/coffee-banner.png',
          alt: 'Lavender Hill Springs Coffee - Coming Soon',
        }}
      />
    </>
  );
}
