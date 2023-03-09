import { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody
} from 'reactstrap'

export default function CustomAccordion({ children, header, id, item }) {
    const [index, setIndex] = useState('accordionItem0')

    function toggle(newIndex: string) {
        if (newIndex === index) {
            setIndex('accordionItem0')
        } else {
            setIndex(newIndex)
        }
    }

    return (
            <Accordion toggle={toggle} open={index}>
                <AccordionItem>
                    <AccordionHeader targetId={item}>
                        <h4 style={{ align: 'center', color: 'red' }}>{header} </h4>
                    </AccordionHeader>
                    <AccordionBody accordionId={item}>
                        {children}
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
    )
}
