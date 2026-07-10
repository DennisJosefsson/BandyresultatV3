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
          className="mb-2 rounded-md border-b p-2 shadow-md last:border-b-0"
        >
          <AccordionTrigger className="text-[10px] sm:text-xs md:text-sm">
            Resultatformulär
          </AccordionTrigger>
          <AccordionContent>
            <ResultFormComponent />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="orderform"
          className="mb-2 rounded-md border-b p-2 shadow-md last:border-b-0"
        >
          <AccordionTrigger className="text-[10px] sm:text-xs md:text-sm">
            Sorteringsval
          </AccordionTrigger>
          <AccordionContent>
            <OrderFormComponent />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="seasonform"
          className="mb-2 rounded-md border-b p-2 shadow-md last:border-b-0"
        >
          <AccordionTrigger className="text-[10px] sm:text-xs md:text-sm">
            Säsongsinställningar
          </AccordionTrigger>
          <AccordionContent>
            <SeasonFormComponent />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="preferenceform"
          className="mb-2 rounded-md border-b p-2 shadow-md last:border-b-0"
        >
          <AccordionTrigger className="text-[10px] sm:text-xs md:text-sm">
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
