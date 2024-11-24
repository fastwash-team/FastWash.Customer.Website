import FaqMessage from "../assets/svgs/faq-message.svg";
import FaqCare from "../assets/svgs/faq-care.svg";
import { HelpCenterModal } from "../components/modals/help.modal";

export function HelpCenter() {
  return (
    <div className='help-container'>
      <a className='help' href='/faqs' target='_blank'>
        <img src={FaqMessage} alt='' />
        <h4>FAQs</h4>
        <p>Get answers to questions people commonly ask at FastWash</p>
      </a>
      <div
        className='help'
        data-bs-toggle='modal'
        data-bs-target='#help-centre-modal'
        id='help-centre-modal-btn'
      >
        <img src={FaqCare} alt='' />
        <h4>Help & Support</h4>
        <p>Get the help you need anytime from our support team</p>
      </div>
      <HelpCenterModal />
    </div>
  );
}
