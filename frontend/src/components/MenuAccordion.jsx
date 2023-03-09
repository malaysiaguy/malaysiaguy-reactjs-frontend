import {
    Container,
    Col,
    Row,
    Button
} from 'reactstrap'

function MenuAccordion() {
    return (
        <Section id='QA' className='p-5'>
            <Container>
                <h2 className='text-center mb-4'>Frequently Asked Question</h2>
                <Accordion id='accordions' accordion-flush>
                    <AccordionItem>
                        <AccordionHeader className='h2'>
                            <Button className='accordion-button collapsed' collapse='true' target='#collapse1'>
                                AccordionItem #1
                            </Button>
                        </AccordionHeader>
                        <div id='collapse1' className='accordion-collapse collapse' parent='accordions'>
                            <AccordionBody>
                                Some Text Here ....
                            </AccordionBody>
                        </div>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader className='h2'>
                            <Button className='accordion-button collapsed' collapse='true' target='#collapse2'>
                                AccordionItem #2
                            </Button>
                        </AccordionHeader>
                        <div id='collapse2' className='accordion-collapse collapse' parent='accordions'>
                            <AccordionBody>
                                Some Text Here ....
                            </AccordionBody>
                        </div>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader className='h2'>
                            <Button className='accordion-button collapsed' collapse='true' target='#collapse3'>
                                AccordionItem #3
                            </Button>
                        </AccordionHeader>
                        <div id='collapse3' className='accordion-collapse collapse' parent='accordions'>
                            <AccordionBody>
                                Some Text Here ....
                            </AccordionBody>
                        </div>
                    </AccordionItem>
                </Accordion>
            </Container>
        </Section>
    )
}

export default MenuAccordion
