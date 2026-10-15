import { IconX } from "@tabler/icons-react";

type PrivacyPolicyModalProps = {
  showModal: boolean;
  onClose: () => void;
};

export const PrivacyPolicyModal = ({
  showModal,
  onClose,
}: PrivacyPolicyModalProps) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-11/12 flex-col rounded-lg bg-white shadow-lg md:w-3/4 lg:w-1/2"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4">
          <h2
            id="privacy-policy-title"
            className="text-2xl font-bold uppercase"
          >
            Privacy Policy
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close privacy policy"
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <IconX size={24} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6">
          <article className="space-y-5 border border-gray-300 rounded-md p-4 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">
              Lavish Treats | Last updated: 15 October 2026
            </p>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">Who we are</h3>
              <p>
                Lavish Treats (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a
                bakery based in Kettering, Northamptonshire. We are the data
                controller for the personal information collected through
                lavishtreats.co.uk.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Business name: Lavish Treats</li>
                <li>Business location: Kettering, Northamptonshire, UK</li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@lavishtreats.co.uk"
                    className="text-purple-primary hover:underline"
                  >
                    info@lavishtreats.co.uk
                  </a>
                </li>
              </ul>
              <p className="mt-2">
                This policy explains what personal information we collect, why
                we collect it, who we share it with, and your rights under UK
                data protection law, including the UK GDPR and the Data
                Protection Act 2018.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                What we collect
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <strong>Orders:</strong> your name, email address, phone
                  number, collection or delivery date and time, the items
                  ordered, the order total, and any order notes.
                </li>
                <li>
                  <strong>Delivery orders:</strong> your address, town or city,
                  and postcode.
                </li>
                <li>
                  <strong>Order notes:</strong> please only include information
                  needed to prepare your order. Allergy or dietary information
                  may be health information. By providing it, you explicitly
                  consent to our use of it to prepare your order safely.
                </li>
                <li>
                  <strong>Newsletter:</strong> your email address when you
                  subscribe.
                </li>
                <li>
                  <strong>Contact and custom enquiries:</strong> the details,
                  message, preferences, and files you submit, together with our
                  replies.
                </li>
                <li>
                  <strong>Website data:</strong> technical information such as
                  your IP address, browser type, and pages visited may be
                  collected for security and to keep the website running.
                </li>
              </ul>
              <p className="mt-2">
                Card details are entered on Stripe&apos;s secure checkout page.
                We do not see or store your full card details; we receive
                confirmation of the payment result.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                Why we use your information
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  To take, prepare, deliver, or arrange collection of your
                  order and send order confirmation emails (contract).
                </li>
                <li>
                  To process payment and keep appropriate financial records
                  (contract and legal obligation).
                </li>
                <li>
                  To use allergy or dietary information you provide to prepare
                  your order safely (explicit consent).
                </li>
                <li>
                  To send newsletters and special offers when you subscribe
                  (consent). You can unsubscribe at any time.
                </li>
                <li>
                  To answer questions, manage enquiries, and resolve problems
                  (legitimate interests).
                </li>
                <li>
                  To keep our website, forms, and services secure and working
                  (legitimate interests).
                </li>
              </ul>
              <p className="mt-2">
                We do not sell your personal information or use it for
                automated decision-making.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                Who we share it with
              </h3>
              <p>
                We share only the information needed to run the relevant
                service with:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <strong>Stripe</strong> for payment processing and payment
                  confirmation.
                </li>
                <li>
                  <strong>Supabase</strong> for secure storage of paid order
                  records and order management.
                </li>
                <li>
                  <strong>Resend</strong> for order confirmation emails and
                  newsletter subscription management.
                </li>
                <li>
                  <strong>Netlify</strong> for website hosting and contact and
                  custom-enquiry form submissions.
                </li>
              </ul>
              <p className="mt-2">
                We may also share information where the law requires it, for
                example with HMRC or law-enforcement authorities. If you
                contact us through WhatsApp or Instagram, those services
                process your messages under their own privacy policies.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                Transfers outside the UK
              </h3>
              <p>
                Some service providers may store or process information
                outside the UK, including in the United States or the
                European Economic Area. Where this happens, we rely on an
                applicable adequacy regulation or approved safeguards such as
                the UK International Data Transfer Agreement or Addendum.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                How long we keep it
              </h3>
              <p>
                We keep information only for as long as it is needed for the
                purpose it was collected, to provide the service, to deal with
                questions or disputes, or to meet legal and accounting
                requirements. Newsletter details are kept until you unsubscribe.
                Allergy and dietary notes are retained only with the relevant
                order record and are not used for other purposes. We then
                delete or anonymise the information where possible.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">Your rights</h3>
              <p>
                Subject to legal exceptions, you can ask us for a copy of your
                information, ask us to correct or delete it, restrict or object
                to its use, or provide it in a portable format. You can
                withdraw consent at any time, including by unsubscribing from
                our newsletter.
              </p>
              <p className="mt-2">
                Email{" "}
                <a
                  href="mailto:info@lavishtreats.co.uk"
                  className="text-purple-primary hover:underline"
                >
                  info@lavishtreats.co.uk
                </a>
                . We will normally reply within one month.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">Cookies</h3>
              <p>
                We use only cookies and similar technologies needed to make the
                website work. We do not currently use analytics or advertising
                cookies. You can block or delete cookies in your browser
                settings, although parts of the website may not work properly.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">Children</h3>
              <p>
                Our website is not aimed at children under 13, and we do not
                knowingly collect their information. Orders should be placed by
                an adult.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                Keeping your information safe
              </h3>
              <p>
                We use reputable providers, encrypted connections (HTTPS), and
                restricted access to order data. No system is completely
                risk-free, but we take reasonable steps to protect your
                information.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">Complaints</h3>
              <p>
                Please contact us first so we can try to put things right. You
                also have the right to complain to the Information
                Commissioner&apos;s Office at{" "}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-primary hover:underline"
                >
                  ico.org.uk
                </a>{" "}
                or on 0303 123 1113.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                Changes and contact
              </h3>
              <p>
                We may update this policy from time to time. The latest version
                will be available in this modal with the date at the top.
                Questions about this policy or your information can be sent to{" "}
                <a
                  href="mailto:info@lavishtreats.co.uk"
                  className="text-purple-primary hover:underline"
                >
                  info@lavishtreats.co.uk
                </a>
                .
              </p>
            </section>
          </article>

          
        </div>
      </div>
    </div>
  );
};
