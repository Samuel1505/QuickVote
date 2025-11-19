import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function FAQ() {
    const faqs = [
      {
        question: "What is QuickVote and how does it work?",
        answer: "QuickVote is a blockchain-based voting platform that allows you to participate in elections securely from anywhere. It uses blockchain technology to ensure every vote is recorded transparently and cannot be tampered with. Simply connect your wallet, verify your identity, and cast your vote."
      },
      {
        question: "Is my vote really anonymous?",
        answer: "Yes, absolutely. While your identity is verified to ensure you're eligible to vote, your actual vote is encrypted and anonymous. The blockchain records that you voted, but not who you voted for, ensuring complete ballot secrecy."
      },
      {
        question: "How secure is blockchain voting?",
        answer: "Blockchain voting is extremely secure. Each vote is encrypted and recorded on an immutable ledger that cannot be altered or deleted. The decentralized nature of blockchain means there's no single point of failure, making it virtually impossible to hack or manipulate results."
      },
      {
        question: "Do I need technical knowledge to use QuickVote?",
        answer: "Not at all! QuickVote is designed to be user-friendly. If you can use a smartphone or computer, you can use QuickVote. We guide you through each step, from connecting your wallet to casting your vote. No technical expertise required."
      },
      {
        question: "What do I need to start voting?",
        answer: "You'll need a digital wallet (like MetaMask or similar) and a valid form of identification for one-time verification. Once verified, you can participate in any election you're eligible for with just a few clicks."
      },
      {
        question: "Can I verify that my vote was counted?",
        answer: "Yes! After voting, you receive a unique transaction ID that you can use to verify your vote was recorded on the blockchain. You can check this at any time to ensure your vote was counted correctly."
      },
      {
        question: "How much does it cost to vote?",
        answer: "Voting on QuickVote is free for voters. There may be minimal blockchain transaction fees (gas fees) depending on the network, but these are typically very small and are clearly displayed before you vote."
      },
      {
        question: "What types of elections can be held on QuickVote?",
        answer: "QuickVote supports various types of elections including government elections, organizational votes, community decisions, shareholder voting, and more. Any group or organization can create and manage elections on our platform."
      }
    ]
  
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-(--purple-bg) rounded-full mb-4">
              <span className="text-sm font-semibold text-(--purple-primary)">FAQ</span>
            </div>
            <h2 className="heading-xl text-(--purple-deep) mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lead text-gray-600">
              Everything you need to know about QuickVote and blockchain voting.
            </p>
          </div>
  
          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-2 border-gray-100 rounded-xl px-6 hover:border-(--purple-primary)/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-(--purple-deep) hover:text-(--purple-primary) py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
  
          {/* Contact CTA */}
          <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-(--purple-bg) to-white border border-(--purple-lighter)/20">
            <p className="text-gray-700 mb-4">
              Still have questions? We're here to help!
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-(--purple-primary) hover:bg-(--purple-deep) text-white font-semibold rounded-lg transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    )
  }