import FaqMessage from "../assets/svgs/faq-message.svg";
import FaqCare from "../assets/svgs/faq-care.svg";

export function HelpCenter() {
  return (
    <div className='help-container'>
      <div className='help'>
        <img src={FaqMessage} alt='' />
        <h4>FAQs</h4>
        <p>Get answers to questions people commonly ask at FastWash</p>
      </div>
      <div className='help'>
        <img src={FaqCare} alt='' />
        <h4>Help & Support</h4>
        <p>Get the help you need anytime from our support team</p>
      </div>
    </div>
  );
}
