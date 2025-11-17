export interface Verse {
  id: string;
  reference: string;
  text: string;
}

export const highlightedVerses: Verse[] = [
  {
    id: 'gn-1-1',
    reference: 'Gênesis 1:1',
    text: 'No princípio Deus criou os céus e a terra.'
  },
  {
    id: 'sl-23-1',
    reference: 'Salmos 23:1',
    text: 'O Senhor é o meu pastor; nada me faltará.'
  },
  {
    id: 'mt-5-14',
    reference: 'Mateus 5:14-16',
    text: 'Vocês são a luz do mundo... Assim brilhe a luz de vocês diante dos homens.'
  }
];
