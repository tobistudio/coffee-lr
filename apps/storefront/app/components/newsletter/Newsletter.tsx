import { Alert } from '@app/components/common/alert';
import { newsletterSubscriberSchema } from '@app/routes/api.newsletter-subscriptions';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@lambdacurry/forms/remix-hook-form';
import { useFetcher } from 'react-router';
import clsx from 'clsx';
import { type FC, useEffect } from 'react';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';
import { SubmitButton } from '../common/remix-hook-form/buttons/SubmitButton';

export const NewsletterSubscription: FC<{ className?: string }> = ({ className }) => {
  const fetcher = useFetcher<{
    success: boolean;
    errors?: Record<string, { message: string }>;
  }>();

  const form = useRemixForm({
    resolver: zodResolver(newsletterSubscriberSchema),
    fetcher,
    submitConfig: {
      method: 'post',
      action: '/api/newsletter-subscriptions',
    },
  });

  useEffect(() => {
    if (fetcher.data?.success) {
      form.reset();
    }
  }, [fetcher.data]);

  return (
    <div className={clsx('card flex flex-col rounded text-white', className)}>
      {fetcher.data?.success ? (
        <Alert type="success" className="mb-2 mt-4 min-w-[280px]" title={`Thank you for subscribing!`} />
      ) : (
        <RemixFormProvider {...form}>
          <fetcher.Form>
            <div className="flex items-end gap-2 border-b border-white">
              <div className="flex flex-col text-white gap-5">
                <span className="text-lg font-bold">Newsletter</span>
                <p className="font-light">Sign up for our newsletter to only receive good things.</p>
              </div>
              <div>
                <TextField
                  name="email"
                  placeholder="Enter your email"
                  className="min-w-[220px] border-none rounded-none text-black"
                />
                <SubmitButton className="h-12" disabled={fetcher.state !== 'idle'}>
                  Subscribe
                </SubmitButton>
              </div>
              <SubmitButton variant="ghost" className="pr-0 pl-0">
                <ArrowRightIcon className="w-5 h-5" />
              </SubmitButton>
            </div>
          </fetcher.Form>
        </RemixFormProvider>
      )}
    </div>
  );
};
