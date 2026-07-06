import { zd } from '@/lib/utils/zod'

export const parseSearchRequest = (
  object: unknown,
  maxSeason:
    | {
        year: string
      }
    | undefined,
) => {
  if (!maxSeason) {
    throw new Error('Missing maxSeason')
  }

  const maxYear = maxSeason.year.split('/')[1]

  const searchRequest = zd
    .object({
      categoryArray: zd
        .array(
          zd.enum([
            'final',
            'semi',
            'quarter',
            'eight',
            'regular',
            'qualification',
            'playoffseries',
          ]),
        )
        .min(1, {
          message: 'Måste ange minst en matchkategori.',
        })
        .catch([
          'final',
          'semi',
          'quarter',
          'eight',
          'regular',
          'qualification',
          'playoffseries',
        ]),
      order: zd.enum(['asc', 'desc']).catch('desc'),
      limit: zd.coerce.number().max(50).catch(10),
      result: zd
        .string()
        .regex(/^\d{1,2}-\d{1,2}$/, {
          message: 'Felaktigt resultatformat',
        })
        .optional()
        .nullable()
        .or(zd.literal('')),
      gameResult: zd
        .enum(['win', 'lost', 'draw', 'all'])
        .catch('all'),
      goalsScored: zd.coerce
        .number({
          message: 'Gjorda mål måste vara en siffra.',
        })
        .int({
          message: 'Gjorda mål måste vara ett heltal.',
        })
        .nonnegative({
          message:
            'Gjorda mål måste vara 0 eller större än 0.',
        })
        .optional(),
      goalsScoredOperator: zd
        .enum(['eq', 'lte', 'gte'])
        .catch('gte'),
      goalsConceded: zd.coerce
        .number({
          message: 'Insläppta mål måste vara en siffra.',
        })
        .int({
          message: 'Insläppta mål måste vara ett heltal.',
        })
        .nonnegative({
          message:
            'Insläppta mål måste vara 0 eller större än 0.',
        })
        .optional(),
      goalsConcededOperator: zd
        .enum(['eq', 'lte', 'gte'])
        .catch('lte'),
      goalDiff: zd.coerce
        .number({
          message: 'Målskillnaden måste vara en siffra.',
        })
        .int({
          message: 'Målskillnaden måste vara ett heltal.',
        })
        .optional(),
      goalDiffOperator: zd
        .enum(['eq', 'lte', 'gte'])
        .catch('gte'),
      startSeason: zd
        .preprocess(
          (val) => {
            if (val === undefined) return '1907'
            return val
          },
          zd.coerce
            .string()
            .regex(/^\d{4}$/, {
              message:
                'Fel format, första år, ska vara ett fyrsiffrigt tal (t.ex. 2025 för säsongen 2024/2025).',
            })
            .refine(
              (arg) => {
                if (Number(arg) < 1907) return false
                return true
              },
              {
                message:
                  'Första året kan inte vara före 1907',
              },
            )
            .refine(
              (arg) => {
                if (Number(arg) > parseInt(maxYear))
                  return false
                return true
              },
              {
                message: `Första året kan inte vara efter ${maxYear}`,
              },
            ),
        )
        .transform((val) => {
          return `${Number(val) - 1}`
        }),
      endSeason: zd.preprocess(
        (val) => {
          if (val === undefined) return maxYear
          return val
        },
        zd.coerce
          .string()
          .regex(/^\d{4}$/, {
            message:
              'Fel format, sista år, ska vara ett fyrsiffrigt tal (t.ex. 2025 för säsongen 2024/2025)',
          })
          .refine(
            (arg) => {
              if (Number(arg) < 1907) return false
              return true
            },
            {
              message: 'Sista året kan inte vara före 1907',
            },
          ),
      ),
      teamId: zd.number().optional(),
      opponentId: zd.number().optional(),
      inputDate: zd
        .string()
        .regex(/^\d{1,2}\/\d{1,2}/, {
          message: 'Fel datum, sökning',
        })
        .refine(
          (arg) => {
            const dateArgs = arg.split('/')
            if (
              Number(dateArgs[0]) > 31 ||
              Number(dateArgs[0]) === 0 ||
              Number(dateArgs[1]) > 12 ||
              Number(dateArgs[1]) === 0
            )
              return false
            return true
          },
          { message: 'Fel datumformat' },
        )
        .optional()
        .nullable()
        .or(zd.literal('')),
      homeGame: zd
        .enum(['home', 'away', 'all'])
        .catch('all'),

      selectedGender: zd
        .enum(['men', 'women', 'all'])
        .catch('all'),
      orderVar: zd
        .enum([
          'date',
          'goalsScored',
          'goalsConceded',
          'goalDifference',
          'totalGoals',
        ])
        .catch('date'),
    })
    .refine(
      (arg) =>
        Number(arg.endSeason) >=
        Number(arg.startSeason) + 1,
      {
        message:
          '"Första år" kan inte komma efter "Sista år"',
        path: ['startSeason'],
      },
    )
    .refine(
      (arg) => {
        if (arg.teamId && arg.opponentId) {
          if (arg.teamId == arg.opponentId) return false
        }
        return true
      },
      {
        message: 'Lag och motståndare får inte vara samma.',
        path: ['opponentId'],
      },
    )
    .refine(
      (arg) => {
        if (arg.opponentId && !arg.teamId) return false
        return true
      },
      {
        message:
          'Kan inte välja motståndare utan att välja lag.',
        path: ['opponent'],
      },
    )

  const parsedObject = searchRequest.safeParse(object)

  return parsedObject
}
