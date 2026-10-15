import { IconX } from "@tabler/icons-react";

type TermsModalProps = {
  showModal: boolean;
  onClose: () => void;
  onPrivacyPolicy?: () => void;
};

export const TAndCModal = ({
  showModal,
  onClose,
  onPrivacyPolicy,
}: TermsModalProps) => {
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
        aria-labelledby="terms-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4">
          <h2 id="terms-title" className="text-2xl font-bold uppercase">
            Terms &amp; Conditions
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terms and conditions"
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <IconX size={24} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6">
          <article className="space-y-5 rounded-md border border-gray-300 p-4 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">
              Lavish Treats | Last updated: 15 October 2026
            </p>
            <p>
              By placing an order with Lavish Treats, you confirm that you have
              read and accepted these terms. Please contact us if anything is
              unclear before placing your order.
            </p>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                1. Orders and availability
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Standard orders should be placed with at least 7 days&apos;
                  notice. Custom enquiries ask for at least 5 days&apos;
                  notice; rush orders within 48 hours may be considered from
                  £20, subject to availability.
                </li>
                <li>
                  Orders and enquiries may be made through our website, email,
                  phone, WhatsApp, or social media accounts.
                </li>
                <li>
                  An order is only confirmed when we have confirmed
                  availability and, where applicable, received the required
                  payment or deposit.
                </li>
                <li>
                  All products are freshly made to order. Prices may vary
                  depending on customisation, ingredients, and design
                  complexity.
                </li>
                <li>
                  Custom orders are subject to availability and may include
                  additional charges for bespoke designs or requested
                  alterations.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                2. Changes to an order
              </h3>
              <p>
                Please request changes at least 3 days before the scheduled
                collection or delivery date. We will try to accommodate
                changes, but cannot guarantee them once preparation has begun.
                Changes may affect the price, availability, or agreed date.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                3. Cake design and inspiration
              </h3>
              <p>
                Reference photographs and images are for inspiration and
                guidance only. We will aim to capture the key features and
                overall style, but an exact replica cannot be guaranteed.
                Variations may occur in colours, shades, decorations,
                proportions, and design details because every product is
                individually handcrafted.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                4. Payment
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Online shop orders are paid securely by card through Stripe.
                </li>
                <li>
                  Custom orders require a 70% deposit to confirm the booking.
                  The balance is due 2 days before the scheduled collection or
                  delivery date.
                </li>
                <li>
                  If the balance is not paid by the due date, we may cancel the
                  order and retain the deposit.
                </li>
                <li>
                  A custom cake description may state a different deposit
                  requirement. The deposit and balance confirmed in your quote
                  or order confirmation will apply.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                5. Cancellations and refunds
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Custom orders cancelled at least 4 days before the scheduled
                  date are eligible for a full refund of the deposit. For
                  cancellations within 2 days of the scheduled date, the
                  deposit will be forfeited.
                </li>
                <li>
                  No refund will be issued after an order has been completed or
                  delivered, except where the issue was caused by an error on
                  our part.
                </li>
                <li>
                  If we must cancel because of unforeseen circumstances, such
                  as illness or equipment failure, we will provide a full
                  refund of payments received for the affected order.
                </li>
                <li>
                  Nothing in these terms affects your statutory rights as a
                  consumer.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                6. Collection and delivery
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Collection is from Kettering, United Kingdom, by appointment
                  at the agreed date and time.
                </li>
                <li>
                  Delivery availability and charges depend on the address.
                  Delivery charges are added separately to custom cake prices
                  where applicable.
                </li>
                <li>
                  Please arrive on time. Late collection may attract a £10 fee,
                  payable before the order is released.
                </li>
                <li>
                  Once an order has been collected or delivered, we are not
                  responsible for damage caused by transport, storage, or
                  handling outside our care.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                7. Allergies and dietary requirements
              </h3>
              <p>
                Please tell us about allergies or dietary requirements when
                placing an order. We take reasonable care, but our products may
                contain or come into contact with allergens including nuts,
                gluten, dairy, eggs, and other ingredients. We cannot guarantee
                that any product is completely free from allergens.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                8. Cake care and storage
              </h3>
              <p>
                Store cakes in a cool, dry place away from direct sunlight. If
                refrigeration is needed, remove the cake from the refrigerator
                at least 30 minutes before serving where appropriate. We are
                not responsible for problems caused by incorrect storage or
                handling after collection or delivery.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                9. Designs and photography
              </h3>
              <p>
                Unless agreed otherwise, custom designs remain the intellectual
                property of Lavish Treats. We may photograph completed products
                and use those photographs for marketing. Please tell us before
                or when placing your order if you do not want your product
                photographed or shared.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                10. Privacy
              </h3>
              <p>
                We process personal information in accordance with our{" "}
                {onPrivacyPolicy ? (
                  <button
                    type="button"
                    onClick={onPrivacyPolicy}
                    className="text-purple-primary hover:underline"
                  >
                    Privacy Policy
                  </button>
                ) : (
                  "Privacy Policy"
                )}
                . It explains how we use information submitted with orders,
                enquiries, payments, and newsletter subscriptions.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">
                11. Changes to these terms
              </h3>
              <p>
                We may update these terms from time to time. The latest version
                will be available on our website with the date shown at the
                top. The terms in effect when we confirm your order will apply
                to that order.
              </p>
            </section>

            <section>
              <h3 className="mb-1 font-semibold text-gray-900">Contact us</h3>
              <p>
                Questions about these terms can be sent to:
                <br />
                Lavish Treats
                <br />
                <a
                  href="mailto:info@lavishtreats.co.uk"
                  className="text-purple-primary hover:underline"
                >
                  info@lavishtreats.co.uk
                </a>
                <br />
                07849 496465
              </p>
            </section>
          </article>
          
        </div>
      </div>
    </div>
  );
};
