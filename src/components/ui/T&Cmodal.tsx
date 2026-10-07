import { IconX } from "@tabler/icons-react";

export const TAndCModal = ({ showModal, onClose}: { showModal: boolean; onClose: () => void }) => {
   
  return (
    <>
      {showModal && (
       
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[85vh] flex flex-col">
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <IconX size={24} />
              </button>
            </div>
            <div className="p-6 pb-0">
              <h2 className="text-2xl font-bold text-center uppercase mb-4">
                Terms & Conditions
              </h2>
            </div>

            <div className="px-6 flex-1 overflow-y-auto min-h-0">
              <div className="border border-gray-300 rounded-md">
                <div className="p-4 text-sm text-gray-700 space-y-4">
                  <p>
                    By placing an order with us, you agree to the following terms and
                    conditions. Please read them carefully before proceeding with your order.
                  </p>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-1">2. Orders</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>All orders must be placed with a minimum of 7 days' notice.</li>
                      <li>Orders can be made via phone, email, online ordering system, or WhatsApp and our social media accounts.</li>
                      <li>We accept custom orders based on availability. Custom designs or cakes require clear communication of preferences, and additional charges may apply for custom designs.</li>
                      <li>Any changes to an order must be requested 3 days before the scheduled collection date.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-1">3. Payment</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>A deposit of 70% is required to confirm your order. The balance is due 2 days before the scheduled collection date.</li>
                      <li>We accept payment via transfer.</li>
                      <li>If the balance is not paid by the due date, the order will be canceled, and the deposit will be forfeited.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-1">4. Cancellations and Refunds</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Orders can be canceled up to 4 days before the scheduled date for a full refund of the deposit. Cancellations within 2 days of the scheduled date will result in a forfeited deposit.</li>
                      <li>No refunds will be issued after the order has been completed or delivered, except in cases of errors made by us.</li>
                      <li>We reserve the right to cancel any order due to unforeseen circumstances (e.g., illness, equipment failure, etc.) with a full refund provided.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-1">5. Pick-Up</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Pick-up arrangements are made by appointment. Please ensure you arrive at the scheduled time for pick-up. Late collection attracts a fee of £10 before orders are collected.</li>
                      <li>We are not responsible for cakes that are damaged after collection once they leave our care.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-1">6. Allergies and Dietary Restrictions</h3>
                    <p>We take every care in ensuring that our products are safe; however, we cannot guarantee that our cakes are free from all allergens (such as nuts, gluten, dairy, etc.). Please inform us of any allergies or dietary restrictions when placing an order. We will do our best to accommodate, but we cannot accept responsibility for any allergic reactions or health issues resulting from consumption.</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-1">7. Cake Care and Storage</h3>
                    <p>Cakes should be stored in a cool, dry place away from direct sunlight. If necessary, refrigerate your cake but remove it from the fridge at least 30 minutes before serving for the best flavor. We are not responsible for any issues arising from improper storage or handling of cakes after collection.</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-1">8. Ownership of Designs</h3>
                    <p>Custom designs remain the intellectual property of Lavish Treats, unless otherwise agreed upon. By placing an order for a custom design, you grant us permission to use photos of the final product for marketing purposes unless you request otherwise.</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-1">10. Privacy Policy</h3>
                    <p>We respect your privacy and are committed to protecting your personal data. Any personal information collected during the ordering process will be used solely for fulfilling your order and improving our services. We will not share your personal information with third parties without your consent, except as required by law.</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-1">11. Changes to Terms</h3>
                    <p>Lavish Treats reserves the right to update these terms and conditions at any time. Any changes will be posted on our website or communicated directly to customers. By placing an order with us, you acknowledge that you have read and agree to these terms and conditions.</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-gray-900 mb-1">Contact Us</h3>
                    <p>
                      If you have any questions about these terms, please contact us at:
                      <br />
                      Lavish Treats
                      <br />
                      lavishtreats.24@gmail.com
                      <br />
                      07849496465
                    </p>
                  </section>
                </div>
                    <div className="flex justify-center p-4"><img src="/LavishTreatsLogo.webp" alt="Lavish Treats Logo" className="h-12 w-auto" /></div>

              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};