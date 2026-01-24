import PageLayout from "@/components/layout/PageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Help", href: "#" },
    { label: "FAQs" },
  ];

  const faqs = [
    {
      question: "What is BharatAbhiyan?",
      answer: "BharatAbhiyan is a government initiative to empower local services and connect citizens with various government schemes and services through a unified digital platform."
    },
    {
      question: "How much does registration cost?",
      answer: "There is a one-time registration fee of ₹100 to activate your account. This is a non-refundable fee that helps maintain the platform and verify genuine users."
    },
    {
      question: "What documents do I need to register?",
      answer: "You need a valid phone number or email address to register. For certain services, you may need to provide Aadhaar, PAN, or other government-issued IDs for verification."
    },
    {
      question: "How long does the registration process take?",
      answer: "The registration process takes about 5-10 minutes. Once you complete the payment, your account is activated immediately."
    },
    {
      question: "Can I register using my email instead of phone?",
      answer: "Yes, you can register using either your phone number or email address. Both options are available during the registration process."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept UPI (GPay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), and Net Banking from all major banks."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, all payments are processed through Razorpay, a PCI-DSS compliant payment gateway. We do not store your card or bank details on our servers."
    },
    {
      question: "What services can I access after registration?",
      answer: "After registration, you can access various government schemes, apply for certificates, track applications, and avail local services available in your area."
    },
    {
      question: "How can I update my profile information?",
      answer: "Once logged in, you can update your profile information from the 'My Account' section. Some information like registered phone/email may require OTP verification to change."
    },
    {
      question: "What if I forget my password?",
      answer: "You can reset your password using the 'Forgot Password' option on the login page. A reset link will be sent to your registered phone or email."
    },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} title="Frequently Asked Questions">
      <div className="bg-card rounded-lg border border-border p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-secondary">FAQs</h2>
          <p className="text-muted-foreground text-sm mt-1">Find answers to commonly asked questions.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="bg-muted/50 rounded-lg p-4 border border-border text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions? Contact us at{" "}
            <span className="text-primary font-medium">1800-XXX-XXXX</span> or{" "}
            <span className="text-primary font-medium">help@bharatabhiyan.gov.in</span>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQs;
