import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/base/ui/accordion'

import OrderFormComponent from './OrderFormComponent'
import PreferenceFormComponent from './PreferenceFormComponent'
import ResultFormComponent from './ResultFormComponent'
import SeasonFormComponent from './SeasonFormComponent'

const SearchForms = () => {
  return (
    <div>
      <Accordion
        className="border"
        defaultValue={['resultForm']}
      >
        <AccordionItem
          value="resultform"
          className="mb-2 rounded-md p-2 shadow-md border-b last:border-b-0"
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
          className="mb-2 rounded-md p-2 shadow-md border-b last:border-b-0"
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
          className="mb-2 rounded-md p-2 shadow-md border-b last:border-b-0"
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
          className="mb-2 rounded-md p-2 shadow-md border-b last:border-b-0"
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
