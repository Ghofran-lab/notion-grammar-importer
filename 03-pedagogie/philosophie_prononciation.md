# philosophie_prononciation.md

## Objectif

Ce document définit la **démarche** de l'académie pour enseigner la prononciation. Il
complète `03-pedagogie/style_pedagogique.md` et `03-pedagogie/charte_pedagogique.md`,
qui rappellent déjà : *« La prononciation est une compétence à part entière »* et
*« l'apprenant doit comprendre ce qui se passe dans sa bouche et dans son oreille »*.

Comme `philosophie_grammaire.md`, ce document est **transversal**
(`01-strategie/strategie_multilingue.md`). Les exemples sont en français à titre
d'illustration ; les sons et contrastes spécifiques à chaque langue cible et chaque
langue source seront documentés dans de futurs `03-pedagogie/langues/<code>/phonetique.md`.

C'est le document de référence principal de l'Agent Prononciation.

---

## Le triangle bouche / oreille / cerveau

Toute explication de prononciation doit, autant que possible, activer les trois
dimensions :

1. **La bouche (production)** : où se place la langue, les lèvres sont-elles
   arrondies, l'air passe-t-il par le nez, les cordes vocales vibrent-elles. On décrit
   un **geste**, pas un symbole.
2. **L'oreille (perception)** : qu'est-ce qui est difficile à *entendre* pour cette
   audience ? Souvent, l'apprenant ne produit pas mal un son parce qu'il ne peut pas le
   *prononcer*, mais parce qu'il ne l'a jamais vraiment **entendu** comme un son
   différent d'un son de sa langue source.
3. **Le cerveau (représentation)** : pourquoi l'apprenant "entend" un son qui n'est pas
   là, ou ne distingue pas deux sons différents — parce que sa langue source ne fait
   pas cette distinction et que son cerveau a appris, depuis l'enfance, à l'ignorer.

**Avant** :
> "Le son [ɥ] (comme dans 'huit') est une semi-voyelle antérieure arrondie."

**Après** :
> "Pour 'huit', commence à dire 'u' (comme dans 'tu'), avec les lèvres bien rondes et
> avancées — et glisse immédiatement vers le 'i'. Tes lèvres bougent, mais ta langue
> reste presque immobile. C'est ce glissement très rapide qui donne 'hui-t'."

---

## La discrimination avant la production

Un apprenant ne peut pas correctement **produire** un contraste qu'il n'a pas appris à
**percevoir**. La progression standard est donc :

1. **Écouter et distinguer** : l'apprenant entend deux sons proches et doit dire s'ils
   sont identiques ou différents, ou identifier lequel il entend (exercice de
   discrimination auditive).
2. **Répéter** : l'apprenant reproduit le son dans un cadre très guidé (mot isolé,
   syllabe).
3. **Lire à voix haute** : l'apprenant applique le son dans des phrases courtes
   (`READ_ALOUD`, voir `types_exercices.md`), en s'appuyant sur ce qui a été observé.
4. **Parler spontanément** : le son est réutilisé dans une production libre
   (conversation, jeu de rôle).

Sauter l'étape 1 est l'erreur de conception la plus fréquente : elle conduit à des
exercices de répétition mécanique, explicitement déconseillés par
`charte_pedagogique.md`.

---

## L'approche contrastive

Pour chaque son ou phénomène (liaison, intonation, rythme), l'agent identifie :

- un son ou un phénomène **proche** dans la/les langue(s) source(s) prioritaires pour
  ce cours (`01-strategie/strategie_multilingue.md`) ;
- la **différence précise** entre ce son proche et le son cible — c'est cette
  différence, et seulement elle, qui doit être mise en avant.

**Exemple de raisonnement** (français pour anglophones) :
> Le "u" français [y] n'existe pas en anglais. L'apprenant anglophone le remplace
> souvent par "ou" [u]. La différence tient uniquement à la position des lèvres : même
> position de langue que pour "i" (tu**", "vu"), mais lèvres arrondies comme pour "ou".

Ce raisonnement contrastif nourrit les sections `common_mistakes` avec le bon champ
`audience`.

---

## Transcription : simplifiée d'abord, API si utile

L'académie utilise une **transcription simplifiée**, lisible par un débutant sans
formation linguistique (ex. "gran", "bocou", "tan" pour "grand", "beaucoup", "temps" —
voir `seed-courses.json`).

- La transcription simplifiée est **obligatoire** dès qu'un mot est présenté à l'oral
  pour la première fois à un niveau A1-A2.
- L'alphabet phonétique international (API) peut être ajouté **en complément**, jamais
  en remplacement, pour les niveaux où l'apprenant en a l'usage (généralement à partir
  de B1-B2, ou si l'apprenant montre un intérêt pour l'autonomie phonétique — cf.
  `01-strategie/mission.md`, "autonomie progressive").
- Dans tous les cas, distinguer clairement (`COURSE_GENERATION.md`) :
  - la **graphie** (comment le mot s'écrit) ;
  - la **prononciation approximative** (la transcription simplifiée) ;
  - la **remarque pédagogique** (ce que l'apprenant doit comprendre/faire).

---

## Rythme, intonation, liaison : ne pas isoler les sons

La prononciation ne se limite pas aux sons isolés. Dès que la notion travaillée le
permet, l'agent relie le son au niveau supérieur :

- un son dans une **syllabe** (place de l'accent tonique en français : toujours sur la
  dernière syllabe du groupe) ;
- une syllabe dans un **groupe rythmique** (le français parle par groupes de mots liés,
  pas mot par mot) ;
- un groupe dans une **intonation** (montante pour une question, descendante pour une
  affirmation).

La liaison est un exemple parfait d'un phénomène qui ne peut pas être expliqué au
niveau du mot isolé : elle n'existe qu'**entre** deux mots. Lorsqu'un point de
prononciation dépasse le cadre de la leçon en cours, il est explicitement reporté
(`warning` + mention "dans une prochaine leçon"), comme déjà pratiqué dans
`05-donnees/generation/requests/R-A1-PRON-001.json`.

---

## Dédramatiser : la prononciation n'est pas un jugement

La prononciation est une source d'anxiété fréquente chez l'apprenant adulte
(`01-strategie/mission.md`, "de la peur de parler à la confiance"). L'agent :

- présente un écart de prononciation comme une **information utile**, jamais comme un
  jugement sur l'intelligence ou l'effort de l'apprenant ;
- rappelle, lorsque c'est pertinent, qu'un accent n'empêche pas la communication — la
  priorité est l'**intelligibilité**, pas l'imitation parfaite d'un locuteur natif ;
- valorise les petites victoires ("tu viens de produire un son qui n'existe pas dans ta
  langue — c'est normal que ce soit difficile au début").

---

## Types d'exercices privilégiés

Voir `03-pedagogie/types_exercices.md` pour le détail. En résumé, pour la
prononciation :

- discrimination auditive (perception, étape 1) ;
- répétition guidée de mots/syllabes (étape 2) ;
- `READ_ALOUD` de phrases courtes intégrant le point travaillé (étape 3) ;
- activités orales semi-libres (virelangues, mini-dialogues) pour l'étape 4.

---

## Agents concernés

- Agent Prononciation (primaire).
- Agent Architecte Pédagogique (identifie quand un point grammatical a une
  conséquence orale à traiter par l'Agent Prononciation).
- Agent Grammaire (signale les impacts oraux des règles grammaticales, voir
  `philosophie_grammaire.md`, "Grammaire et prononciation").
- Agent Exercices (construit la progression discrimination → production).
- Agent Contrôle Qualité (vérifie la cohérence des transcriptions et la progression
  perception → production).
- Agent Gestionnaire de Connaissances (alimente les futurs
  `03-pedagogie/langues/<code>/phonetique.md`).
