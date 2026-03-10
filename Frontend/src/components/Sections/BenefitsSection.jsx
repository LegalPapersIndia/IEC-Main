// src/components/Sections/BenefitsSection.jsx
export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="py-16 md:py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-blue-900 text-white"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        {/* Heading - centered and slightly larger */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 underline decoration-4 decoration-orange-300 underline-offset-8">
          Benefits of Import Export Code (IEC) Registration Certificate
        </h2>

        {/* Grid - full width with reduced side padding */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Left Column */}
          <div className="space-y-5 md:space-y-6">
            {[
              {
                title: "What is the Applicability of IEC?",
                content:
                  "IEC is mandatory for individuals or businesses involved in the import or export of goods for commercial purposes. Issued by the DGFT, it is a 10-digit code valid for a lifetime, essential for starting an import/export business in India.",
              },
              {
                title: "Do you apply IEC earlier on same PAN?",
                content:
                  "With GST in place, the IEC is now issued using the firm’s PAN. Businesses including proprietorships, partnerships, LLPs, companies, trusts, and HUFs must apply with a valid PAN, bank account, and registered address.",
              },
              {
                title: "Procedure to Apply IEC Registration?",
                content:
                  "IEC is a unique identification number required for import/export activities in India. The steps to register are: Fill out the online application form → Upload required documents → Make the payment online → Receive a confirmation call from the IEC expert → Get your certificate via email.",
              },
              {
                title: "Can you Apply for the Modification in IEC?",
                content: "Yes, you can update or modify your existing IEC by submitting a request through the DGFT portal.",
              },
              {
                title: "How to Apply for IEC Registration?",
                content:
                  "You can register by filling out the IEC form and making payment. Alternatively, email your documents to infoieccodeindia@gmail.com for assistance.",
              },
              {
                title: "What if you Don’t Know How to Fill this Form?",
                content:
                  "If you're unsure about the IEC application process, you can contact our IEC executive. Just send the necessary documents and payment — our experts will handle the rest for you.",
              },
            ].map((item, index) => (
              <details
                key={index}
                className="group bg-white/95 backdrop-blur-sm text-gray-800 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl border border-white/20"
              >
                <summary className="flex justify-between items-center px-5 sm:px-6 py-4 cursor-pointer font-semibold text-base md:text-lg border-l-4 border-orange-500 group-open:bg-gradient-to-r group-open:from-orange-50 group-open:to-blue-50 transition-colors">
                  {item.title}
                  <span className="text-2xl md:text-3xl font-bold text-orange-500 group-open:rotate-180 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 pt-3 text-gray-700 leading-relaxed">
                  <p>{item.content}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-5 md:space-y-6">
            {[
              {
                title: "How much time will take to obtain IEC?",
                content:
                  "IEC registration is a simple process. Once the application is submitted, the DGFT generally issues the code within 10–15 working days.",
              },
              {
                title: "What is the Full Form of IEC?",
                content:
                  "IEC stands for Importer Exporter Code. It is a 10-digit unique identification number essential for conducting import/export activities in India.",
              },
              {
                title: "What is the validity of IEC?",
                content:
                  "IEC is valid for a lifetime once issued. There is no need for renewal unless you decide to cancel it or update the details.",
              },
              {
                title: "Documents Required in case of Partnership?",
                content: (
                  <>
                    <p>The following documents are needed for IEC registration for a Partnership firm:</p>
                    <ul className="list-disc pl-6 mt-3 space-y-1.5 text-gray-700">
                      <li>PAN Card of the firm</li>
                      <li>Partnership Deed</li>
                      <li>PAN & Aadhaar of all partners</li>
                      <li>Cancelled cheque of the firm</li>
                    </ul>
                  </>
                ),
              },
              {
                title: "Documents Required in case of Private Limited or LLP?",
                content: (
                  <>
                    <p>For Private Limited or LLP, the required documents are:</p>
                    <ul className="list-disc pl-6 mt-3 space-y-1.5 text-gray-700">
                      <li>Company PAN Card</li>
                      <li>Certificate of Incorporation</li>
                      <li>PAN & Aadhaar of all directors</li>
                      <li>Cancelled cheque of the company</li>
                    </ul>
                  </>
                ),
              },
              {
                title: "Documents Required in case of Proprietor?",
                content: (
                  <>
                    <p>IEC registration for a Proprietorship requires the following documents:</p>
                    <ul className="list-disc pl-6 mt-3 space-y-1.5 text-gray-700">
                      <li>PAN Card</li>
                      <li>Aadhaar Card</li>
                      <li>Electricity Bill or Rent Agreement</li>
                      <li>Cancelled cheque</li>
                    </ul>
                  </>
                ),
              },
            ].map((item, index) => (
              <details
                key={index}
                className="group bg-white/95 backdrop-blur-sm text-gray-800 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl border border-white/20"
              >
                <summary className="flex justify-between items-center px-5 sm:px-6 py-4 cursor-pointer font-semibold text-base md:text-lg border-l-4 border-orange-500 group-open:bg-gradient-to-r group-open:from-orange-50 group-open:to-blue-50 transition-colors">
                  {item.title}
                  <span className="text-2xl md:text-3xl font-bold text-orange-500 group-open:rotate-180 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 pt-3 text-gray-700 leading-relaxed">
                  {item.content}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}