<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Salle } from '@/domain/models/Salle'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

import { Button } from '@/application/vue/components/ui/button'
import { Calendar } from '@/application/vue/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/application/vue/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/application/vue/components/ui/form'
import { Input } from '@/application/vue/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/application/vue/components/ui/popover'

import { toast } from '@/components/ui/toast'

// import { cn } from '@/lib/utils'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  today,
} from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import RadixIconsCalendar from '~icons/radix-icons/calendar'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { toDate } from 'radix-vue/date'
import { h, ref, onMounted } from 'vue'
import * as z from 'zod'

const periodicite = [
  { label: 'Unique', value: 'unique' },
  { label: 'Hebdomadaire', value: 'hebdo' },
] as const

const participants = [
  { id: 1, nom: 'Alex', prenom: 'Muller' },
  { id: 2, nom: 'Julie', prenom: 'Shmit' },
  { id: 3, nom: 'Jean', prenom: 'Muller' },
  { id: 4, nom: 'Marie', prenom: 'Luit' },
] as const

const accountFormSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: 'Required.',
      })
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(30, {
        message: 'Name must not be longer than 30 characters.',
      }),
    dob: z
      .string()
      .datetime()
      .optional()
      .refine(date => date !== undefined, 'Please select a valid date.'),
    periodicite: z.string().min(1, 'Please select a periode.'),
  }),
)

async function onSubmit(values: any) {
  //   toast({
  //     title: 'You submitted the following values:',
  //     description: h(
  //       'pre',
  //       { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
  //       h('code', { class: 'text-white' }, JSON.stringify(values, null, 2)),
  //     ),
  //   })
}

const listTestSalles: Salle[] = [
  {
    id: '1',
    slug: 'piece1',
    name: 'Pièce n°1',
    num: 1,
    picture: 'room1_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Réunion',
    capacite: 10,
    superficie: '30x50',
    accessible: true,
    surface: ['interieur', 'exterieur'],
    equipments: [
      { id: '1', name: 'chaise', nbr: 10 },
      { id: '2', name: 'tableau blanc', nbr: 1 },
      { id: '3', name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    id: '2',
    slug: 'piece2',
    name: 'Pièce n°2',
    num: 2,
    picture: 'room2_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Détente',
    capacite: 10,
    superficie: '30x50',
    accessible: false,
    surface: ['interieur', 'exterieur'],
    equipments: [
      { id: '1', name: 'chaise', nbr: 10 },
      { id: '2', name: 'tableau blanc', nbr: 1 },
      { id: '3', name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    id: '3',
    slug: 'piece3',
    name: 'Pièce n°3',
    num: 3,
    picture: 'room3_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Réunion',
    capacite: 10,
    superficie: '30x50',
    accessible: true,
    surface: ['interieur', 'exterieur'],
    equipments: [
      { id: '1', name: 'chaise', nbr: 10 },
      { id: '2', name: 'tableau blanc', nbr: 1 },
      { id: '3', name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    id: '4',
    slug: 'piece4',
    name: 'Pièce n°4',
    num: 4,
    picture: 'room4_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Détente',
    capacite: 10,
    superficie: '30x50',
    accessible: false,
    surface: ['interieur', 'exterieur'],
    equipments: [
      { id: '1', name: 'chaise', nbr: 10 },
      { id: '2', name: 'tableau blanc', nbr: 1 },
      { id: '3', name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    id: '5',
    slug: 'piece5',
    name: 'Pièce n°5',
    num: 5,
    picture: 'room5_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Réunion',
    capacite: 10,
    superficie: '30x50',
    accessible: true,
    surface: ['interieur', 'exterieur'],
    equipments: [
      { id: '1', name: 'chaise', nbr: 10 },
      { id: '2', name: 'tableau blanc', nbr: 1 },
      { id: '3', name: 'vidéo projecteur', nbr: 1 },
    ],
  },
]

const route = useRoute()

const salle = ref(null)
const salleFind = ref(false)

onMounted(async () => {
  salle.value = listTestSalles.find(salle => salle.slug == route.params.id)

  salleFind.value = true
  reservation.value.salleId = salle.value.id
})

const reservation = ref({
  salleId: null,
  periodicite: null,
  participants: [],
})
</script>

<template>
  <main v-if="salleFind">
    <div v-if="salle">
      <h1 class="text-4xl font-bold text-center my-4">
        Reservation de {{ salle.name }}
      </h1>

      <Form
        v-slot="{ setFieldValue }"
        :validation-schema="accountFormSchema"
        class="space-y-8"
        @submit="onSubmit"
      >
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Your name"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription> Choisi le nom de ton évènement. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ value }" name="periodicite">
          <FormItem class="flex flex-col">
            <FormLabel>Periodicité</FormLabel>

            <Popover v-model:open="openPeriode">
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    role="combobox"
                    :aria-expanded="openPeriode"
                    :class="'w-[200px] justify-between bg-sky-300'"
                  >
                    {{
                      value
                        ? periodicite.find(
                            periodicite => periodicite.value === value,
                          )?.label
                        : 'Select periodicite...'
                    }}

                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="periode in periodicite"
                        :key="periode.value"
                        :value="periode.label"
                        class="border bg-blue-300 cursor-pointer"
                        @select="
                          () => {
                            setFieldValue('periode', periode.value)
                            reservation.periodicite = periode
                            openPeriode = false
                          }
                        "
                      >
                        <Check :class="'mr-2 h-4 w-4 opacity-100'" />
                        {{ periode.label }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <FormDescription>
              Indique la périodicité de cet évènement.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ value }" name="periodicite">
          <FormItem class="flex flex-col">
            <FormLabel>Participants</FormLabel>

            <Popover v-model:open="openParticipants">
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    role="combobox"
                    :aria-expanded="openParticipants"
                    :class="'w-[200px] justify-between bg-sky-300'"
                  >
                    {{
                      value
                        ? participant.find(participant => participant === value)
                            ?.nom
                        : 'Select participant...'
                    }}

                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search participants..." />
                  <CommandEmpty>No participants found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="participant in participants"
                        :key="participant.id"
                        :value="participant.nom"
                        class="border bg-blue-300 cursor-pointer"
                        @select="
                          () => {
                            setFieldValue('participant', participant.value)
                            if (
                              reservation.participants.some(
                                p => p.id === participant.id,
                              )
                            ) {
                              reservation.participants =
                                reservation.participants.filter(
                                  p => p.id !== participant.id,
                                )
                            } else {
                              reservation.participants.push(participant)
                            }
                            openParticipants = false
                          }
                        "
                      >
                        <Check :class="'mr-2 h-4 w-4 opacity-100'" />
                        {{ participant.nom }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <FormDescription>
              Indique la périodicité de cet évènement.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </Form>

      <div>
        <br />
        <br />
        <br />
        <br />
        {{ reservation }}
      </div>
    </div>

    <div v-else>
      <p class="text-center m-6 p-4 bg-red-100 border border-red-500">
        La salle que vous recherchez n'existe pas :&#40;
      </p>

      <div class="flex justify-center gap-6">
        <RouterLink to="/" class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md">
          Accueil
        </RouterLink>
        <RouterLink
          to="/catalogue-salles"
          class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
        >
          Catalogue des Salles
        </RouterLink>
      </div>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>
