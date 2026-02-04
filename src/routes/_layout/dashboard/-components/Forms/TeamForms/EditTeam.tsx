import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Map, MapControls, MapMarker, MarkerContent } from '@/components/ui/map'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zd } from '@/lib/utils/zod'
import { useStore } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { municipalityQueries } from '../../../-hooks/getMunicipalities'
import { useEditTeamForm } from '../../../-hooks/useEditTeamForm'

const route = getRouteApi('/_layout/dashboard/team/$teamId')

const EditTeam = () => {
  const women = route.useSearch({ select: (s) => s.women })
  const counties = route.useLoaderData({ select: (s) => s.counties.counties })
  const form = useEditTeamForm()
  const countyId = useStore(form.store, (state) => state.values.countyId)
  const { data: municipalities } = useQuery(
    municipalityQueries['teamForm'](countyId),
  )

  const handleDragEnd = (lnglat: { lng: number; lat: number }) => {
    form.setFieldValue('lat', lnglat.lat)
    form.setFieldValue('long', lnglat.lng)
  }

  const initLat = form.getFieldValue('lat')
  const initLong = form.getFieldValue('long')

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ändra lag</CardTitle>
          </div>
          <div className="flex flex-row gap-2">
            <Button asChild>
              <route.Link to="/dashboard/teams" search={{ women }}>
                Tillbaka
              </route.Link>
            </Button>
            <Button type="submit" form="newTeamForm">
              Ändra
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form
          id="newTeamForm"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-2 items-center gap-x-4 gap-y-8">
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Namn</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="T.ex. IFK Oxelösund"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="casualName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Vanligt namn</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="T.ex. Oxelösund"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="shortName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Kort namn</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="T.ex. IFKÖ"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="city"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Stad</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="T.ex. Oxelösund"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="lat"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Latitud</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            zd.coerce.number().parse(e.target.value),
                          )
                        }
                        aria-invalid={isInvalid}
                        placeholder="T.ex. 62"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="long"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Longitud</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            zd.coerce.number().parse(e.target.value),
                          )
                        }
                        aria-invalid={isInvalid}
                        placeholder="T.ex. 15"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="women"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(checked === true)
                          }
                        />
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-normal"
                        >
                          Damlag
                        </FieldLabel>
                      </Field>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <form.Field
                name="countyId"
                listeners={{
                  onChange: () => {
                    form.setFieldValue('municipalityId', 0)
                  },
                }}
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Län</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.state.value.toString()}
                        onValueChange={(value) =>
                          field.handleChange(zd.coerce.number().parse(value))
                        }
                      >
                        <SelectTrigger
                          id={field.name}
                          aria-invalid={isInvalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Välj" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">
                            {field.state.value}
                          </SelectItem>
                          <SelectSeparator />
                          {counties.map((cat) => (
                            <SelectItem
                              key={cat.value}
                              value={cat.value.toString()}
                            >
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              {municipalities ? (
                <form.Field
                  name="municipalityId"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Kommun</FieldLabel>
                        <Select
                          name={field.name}
                          value={field.state.value.toString()}
                          onValueChange={(value) =>
                            field.handleChange(zd.coerce.number().parse(value))
                          }
                        >
                          <SelectTrigger
                            id={field.name}
                            aria-invalid={isInvalid}
                            className="min-w-[120px]"
                          >
                            <SelectValue placeholder="Välj" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectItem value="auto">
                              {field.state.value}
                            </SelectItem>
                            <SelectSeparator />
                            {municipalities.municipalities.map((cat) => (
                              <SelectItem
                                key={cat.value}
                                value={cat.value.toString()}
                              >
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
              ) : null}
            </div>
            <div className="xs:max-w-[360px] h-[400px] w-screen max-w-[280px] p-2 sm:h-160 sm:max-w-xl xl:max-w-4xl">
              <Map center={[15, 62]} zoom={4} fadeDuration={0}>
                <MapMarker
                  latitude={initLat}
                  longitude={initLong}
                  draggable
                  onDragEnd={(value) => handleDragEnd(value)}
                >
                  <MarkerContent>
                    <div className="size-4 rounded-full border-2 border-orange-500 bg-orange-500 opacity-75 shadow-lg" />
                  </MarkerContent>
                </MapMarker>
                <MapControls />
              </Map>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditTeam
