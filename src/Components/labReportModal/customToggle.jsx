import { useAccordionButton } from "react-bootstrap";
import './labReportModal.scss';

export default function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <>
            <a className="wraping">
                <h3> FBS </h3>
                <span onClick={decoratedOnClick}> + </span>
            </a>
        </>
    );
}
