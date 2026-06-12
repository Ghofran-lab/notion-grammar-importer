# types_exercices.md

## Objectif

Ce document définit le **catalogue des types d'exercices** de l'académie : ce
qu'ils évaluent, à quel moment de la progression ils interviennent, et comment ils se
combinent au sein d'un module.

Il met en application, au niveau de l'exercice, les sections 7 à 9 de
`structure-des-cours.md` (pratique guidée → pratique semi-autonome → réutilisation
communicative), ainsi que la progression perception → production de
`philosophie_prononciation.md` et la progression observation → règle → pratique de
`philosophie_grammaire.md`.

Ce document est **transversal** (`01-strategie/strategie_multilingue.md`) : les types
d'exercices ne dépendent pas de la langue cible, seul leur contenu en dépend.

---

## Le rôle d'un exercice : une étape d'apprentissage, pas un contrôle

Un exercice n'est pas un test sanctionnant ce que l'apprenant "doit déjà savoir". Il
est l'endroit où l'apprenant **essaie**, avec un filet de sécurité proportionné à son
niveau d'autonomie sur la notion.

Conséquence directe : un module qui n'utilise qu'un seul type d'exercice (par exemple
uniquement des trous à compléter) ne respecte pas l'esprit de
`structure-des-cours.md`, même si chaque exercice pris isolément est correct. La
**variété** et la **progression d'autonomie** sont aussi importantes que la qualité de
chaque exercice individuel.

---

## La progression d'autonomie

Chaque exercice se situe sur un axe allant d'un **fort accompagnement** à une
**production libre** :

1. **Pratique guidée** (`structure-des-cours.md`, section 7) : l'apprenant choisit ou
   complète parmi des options limitées. L'erreur est facile à repérer et à corriger.
2. **Pratique semi-autonome** (section 8) : l'apprenant transforme, reformule ou
   produit une réponse courte sans options proposées, mais dans un cadre toujours
   balisé.
3. **Réutilisation communicative** (section 9) : l'apprenant produit une réponse libre
   dans une situation de communication réelle (raconter, donner son avis, jouer un
   rôle).

Un module complet **traverse les trois étapes** ; il ne s'arrête pas à l'étape 1 sous
prétexte qu'elle est plus simple à générer et à corriger automatiquement.

---

## Catalogue des types existants

Ces cinq types sont déjà utilisés dans `seed-courses.json` et reconnus par
`courseGenerationSchema.js`, où le champ `type` est désormais validé par l'enum
`EXERCISE_TYPES` (voir section "Format technique" ci-dessous).

### FILL_IN — Texte à compléter

- **Niveau d'autonomie** : pratique guidée.
- **Compétence typique** : grammaire, conjugaison, choix lexical contraint.
- **Principe** : l'apprenant complète une ou plusieurs phrases avec la forme correcte,
  guidé par le contexte (souvent rattaché à l'analogie filée du module — ex.
  "E-B1-GRAM-002 — La boule de cristal — conjugue au futur").
- **Vigilance** : les phrases à compléter doivent rester des phrases réelles
  (`style_pedagogique.md`, "exemples hors-sol"), pas des squelettes grammaticaux.

### READ_ALOUD — Lire à voix haute

- **Niveau d'autonomie** : pratique guidée à semi-autonome, selon la longueur du texte.
- **Compétence typique** : prononciation (étape 3 de
  `philosophie_prononciation.md` — "Lire à voix haute").
- **Principe** : l'apprenant lit des phrases courtes en appliquant un point de
  prononciation observé juste avant (ex. "E-A1-PRON-001 — Lis à voix haute — sans les
  muettes !").
- **Vigilance** : ne jamais utiliser `READ_ALOUD` comme **première** rencontre avec un
  son ou un phénomène — il doit être précédé d'une étape de discrimination/observation
  (voir "Pistes d'évolution" ci-dessous).

### TRANSFORM — Transformation

- **Niveau d'autonomie** : pratique semi-autonome.
- **Compétence typique** : grammaire (changement de temps, de mode, de discours), mais
  transposable à la prononciation (changer le rythme/l'intonation d'une phrase) ou au
  vocabulaire (passer du registre familier au registre formel).
- **Principe** : l'apprenant part d'une phrase donnée et la transforme selon une
  consigne, sans choix proposés (ex. "E-B1-GRAM-007 — Joue au téléphone — transforme en
  indirect !").
- **Vigilance** : la transformation doit avoir un **sens communicatif** ("pourquoi
  voudrait-on transformer cette phrase dans la vraie vie ?"), pas être un exercice
  mécanique gratuit.

### FREE_PRODUCTION — Production libre

- **Niveau d'autonomie** : réutilisation communicative.
- **Compétence typique** : raconter, donner son avis, décrire, se présenter — sans
  gabarit de réponse imposé.
- **Principe** : l'apprenant produit librement plusieurs énoncés dans une situation
  réelle, en réinvestissant la notion du module (ex. "E-A1-GRAM-003 — À toi de coller
  tes propres étiquettes ! — présenter ses objets et sa famille avec mon/ma/mes").
  Les consignes peuvent baliser légèrement la production (nombre minimal d'énoncés,
  exemple d'amorce) sans proposer de réponse à compléter.
- **Vigilance** : c'est l'étape qui boucle la leçon (`structure-des-cours.md`, section
  9) ; elle ne doit jamais précéder une étape guidée. Comme la réponse est libre, la
  consigne doit être suffisamment cadrée pour que l'apprenant sache quoi mobiliser.

### ROLE_PLAY — Mini-dialogue / jeu de rôle

- **Niveau d'autonomie** : réutilisation communicative.
- **Compétence typique** : interaction orale ou écrite, tenir un rôle dans une scène
  proche de la mise en situation initiale du module.
- **Principe** : l'apprenant joue un personnage et produit ses répliques selon une
  situation donnée, en mobilisant la notion travaillée (ex. "E-A2-GRAM-003 — Le
  remplaçant entre en jeu — À qui est-ce, vraiment ? — désigner des objets et répondre
  avec des pronoms possessifs"). Il prolonge naturellement une section `story` lorsque
  le module en contient une.
- **Vigilance** : la situation doit rester proche du vécu et de la mise en situation du
  module (`structure-des-cours.md`, section 9) ; éviter les scénarios artificiels qui
  servent de prétexte à aligner des formes grammaticales.

---

## Pistes d'évolution du catalogue

Ces types ne sont pas encore utilisés dans `seed-courses.json`, mais sont nécessaires
pour couvrir l'ensemble des progressions décrites dans
`philosophie_prononciation.md` et `philosophie_grammaire.md`. Avant qu'un agent les
utilise pour la première fois, il doit :

1. vérifier qu'ils sont supportés par `03-pedagogie/plateforme/` (sinon, signaler à
   l'Agent Plateforme, comme déjà prévu dans `standards_qualite.md`, critère 7) ;
2. ajouter une entrée définitive dans ce catalogue, avec un exemple, une fois validés.

| Type proposé | Niveau d'autonomie | Usage principal |
| --- | --- | --- |
| `LISTEN_AND_CHOOSE` | Pratique guidée | Discrimination auditive (étape 1 de `philosophie_prononciation.md`) — l'apprenant écoute et identifie le son/la forme entendue parmi plusieurs options. |
| `MATCH` (association) | Pratique guidée | Associer deux éléments (mot ↔ image, début ↔ fin de phrase, registre familier ↔ registre formel). |
| `TRUE_FALSE` (vrai/faux) | Pratique guidée | Vérifier la compréhension d'une mise en situation (`structure-des-cours.md`, section 2), avant l'observation grammaticale. |
| `OPEN_QUESTION` (question ouverte) | Pratique semi-autonome | Réponse courte rédigée par l'apprenant — première étape vers la production libre. |

---

## Format technique

`03-pedagogie/plateforme/src/services/courseGenerationSchema.js` valide désormais le
champ `type` d'un exercice par un **enum fermé**, `EXERCISE_TYPES`, à la fois dans le
schéma de génération (sortie structurée OpenAI) et à l'import
(`courseSeedService.js`) :

```js
const EXERCISE_TYPES = ['FILL_IN', 'READ_ALOUD', 'TRANSFORM', 'FREE_PRODUCTION', 'ROLE_PLAY'];
```

Cela signifie que :

- **un type absent de cet enum est désormais rejeté** par la génération comme par
  l'import (la liste n'est plus une chaîne libre) ;
- les cinq types du "Catalogue des types existants" ci-dessus correspondent exactement
  à cet enum.

Un nouveau type d'exercice doit donc toujours suivre ce chemin : proposition dans ce
document → validation par l'Agent Contrôle Qualité → vérification de faisabilité avec
l'Agent Plateforme → **ajout à l'enum `EXERCISE_TYPES`** côté plateforme → ajout au
catalogue ci-dessus avec mention "supporté".

---

## Variété au sein d'un module

Pour un module donné (`standards_qualite.md`, "Améliorations souhaitables — variété des
formats d'exercices") :

- éviter d'utiliser deux fois le même type pour deux notions différentes au sein du
  même module, sauf si le module est volontairement court (une seule notion) ;
- faire correspondre le type d'exercice à l'étape de la leçon : un exercice de
  réutilisation communicative ne doit jamais arriver avant qu'une étape guidée ait
  permis à l'apprenant de se sentir prêt.

---

## Lien avec la gamification et l'expérience apprenant

Ce document définit les exercices du point de vue **pédagogique** : ce qu'ils
évaluent et pourquoi. La manière dont un exercice est **présenté à l'écran** (retours
visuels, séries de réussite, score, badges, mise en scène ludique) relève de
l'expérience utilisateur et de la conception e-learning, et fait l'objet d'une
collaboration dédiée décrite dans `00-systeme/agents.md`.

Un exercice ne doit jamais être conçu *pour* un mécanisme de gamification (ex.
"créons un QCM parce que c'est facile à scorer") : c'est l'objectif pédagogique qui
détermine le type d'exercice, et la couche ludique vient ensuite l'habiller.

---

## Agents concernés

- Agent Exercices (primaire).
- Agent Architecte Pédagogique (choisit la combinaison de types adaptée à un module
  lors de la conception).
- Agent Grammaire, Agent Prononciation (fournissent le contenu correspondant à chaque
  type pertinent dans leur domaine).
- Agent Contrôle Qualité (vérifie la variété et la progression d'autonomie au sein d'un
  module).
- Agent Plateforme (valide la faisabilité technique de tout nouveau type).
- Agent Gestionnaire de Connaissances (maintient ce catalogue à jour).
