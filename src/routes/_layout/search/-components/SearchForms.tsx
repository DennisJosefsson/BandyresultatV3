import { Dispatch, SetStateAction } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import OrderFormComponent from './OrderFormComponent'
import PreferenceFormComponent from './PreferenceFormComponent'
import ResultFormComponent from './ResultFormComponent'
import SeasonFormComponent from './SeasonFormComponent'

type SearchFormsProps = {
  openAccordion: string
  setOpenAccordion: Dispatch<SetStateAction<string>>
}

const SearchForms = ({ openAccordion, setOpenAccordion }: SearchFormsProps) => {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        value={openAccordion}
        onValueChange={setOpenAccordion}
      >
        <AccordionItem
          value="resultform"
          className="bg-background mb-2 rounded-md p-2 shadow-md"
        >
          <AccordionTrigger className="text-sm md:text-base">
            Resultatformulär
          </AccordionTrigger>
          <AccordionContent>
            <ResultFormComponent />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="orderform"
          className="bg-background mb-2 rounded-md p-2 shadow-md"
        >
          <AccordionTrigger className="text-sm md:text-base">
            Sorteringsval
          </AccordionTrigger>
          <AccordionContent>
            <OrderFormComponent />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="seasonform"
          className="bg-background mb-2 rounded-md p-2 shadow-md"
        >
          <AccordionTrigger className="text-sm md:text-base">
            Säsongsinställningar
          </AccordionTrigger>
          <AccordionContent>
            <SeasonFormComponent />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="preferenceform"
          className="bg-background mb-2 rounded-md p-2 shadow-md"
        >
          <AccordionTrigger className="text-sm md:text-base">
            Matchinställningar
          </AccordionTrigger>
          <AccordionContent>
            <PreferenceFormComponent />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default SearchForms
