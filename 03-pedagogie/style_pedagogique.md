# style_pedagogique.md

## Objectif

Ce document définit **comment écrire** un contenu de l'académie, indépendamment de la
notion enseignée. La charte pédagogique (`charte_pedagogique.md`) définit les principes
("quoi" et "pourquoi"). Ce document définit la **voix, le ton et les techniques
d'écriture** ("comment").

C'est le document le plus consulté de toute la base de connaissances : il est requis
par la quasi-totalité des agents de production (`00-systeme/agent_knowledge_map.md`).
En cas de doute sur une formulation, ce document tranche — sauf si un golden example
(`03-pedagogie/examples/`) montre une pratique différente, auquel cas l'exemple
prévaut et ce document doit être mis à jour.

---

## Le principe central : un accompagnement, pas un manuel

> L'apprenant doit avoir le sentiment d'être accompagné par un professeur attentif, pas
> de lire un manuel scolaire.

Concrètement, cela veut dire que dans chaque section, on peut imaginer un professeur
**physiquement présent** qui parle à l'apprenant. Ce professeur :

- réagit à ce que l'apprenant vient de voir/dire ("Tu as remarqué que...?") ;
- anticipe ses questions avant qu'il ne les pose ;
- valorise ses essais, même imparfaits ;
- ne l'assomme jamais d'informations dont il n'a pas encore besoin.

**Test rapide** : si une phrase pourrait figurer telle quelle dans une encyclopédie ou
un Bescherelle, elle doit être réécrite.

---

## La voix : tutoiement par défaut

L'académie s'adresse à des **adultes**, mais vise une relation de **proximité** et de
confiance, proche d'un cours particulier ou d'un coaching individuel
(`01-strategie/mission.md`).

**Règle** : on utilise le **tutoiement** ("tu") dans les consignes, les explications et
les questions directes à l'apprenant.

> Note de cohérence : `seed-courses.json` mélange actuellement "tu" ("Imagine les
> lettres...") et "vous" ("Imaginez deux artistes..."). Le tutoiement est retenu comme
> standard par défaut car il correspond à la posture d'accompagnement individuel
> recherchée. Le contenu existant utilisant "vous" n'a pas besoin d'être réécrit en
> urgence, mais toute nouvelle production doit utiliser "tu". Si un marché ou un
> contexte culturel impose le vouvoiement (à documenter le cas échéant dans
> `01-strategie/strategie_multilingue.md`), cela doit être une décision explicite, pas
> un choix par défaut.

Le "vous" reste approprié **dans le contenu lui-même** lorsqu'il illustre une situation
de politesse ou de registre formel (ex. un dialogue dans un contexte professionnel) —
voir l'exemple du conditionnel de politesse dans `seed-courses.json`.

---

## La structure d'une explication

Toute explication suit, dans l'esprit, cette progression (déjà posée par
`structure-des-cours.md`, ici détaillée au niveau de la phrase et du paragraphe) :

1. **Ancrage** : une situation, une phrase, un exemple concret — jamais une définition
   en ouverture.
2. **Observation guidée** : une question qui pousse l'apprenant à remarquer quelque
   chose par lui-même ("Qu'est-ce qui change entre ces deux phrases ?").
3. **Le pourquoi** : l'explication ne décrit pas seulement *ce qui* se passe, mais
   *pourquoi* ça se passe ainsi — voir section suivante.
4. **La règle, formulée simplement** : courte, mémorisable, formulée avec prudence
   (« généralement », « souvent », « dans la plupart des cas » plutôt que des
   absolus — voir `philosophie_grammaire.md`).
5. **Exemples ancrés dans le réel** : situations quotidiennes, jamais des phrases
   construites uniquement pour illustrer la règle.
6. **Anticipation des erreurs** : voir section dédiée.

---

## Le "pourquoi" : ce qui se passe dans la bouche, l'oreille, le cerveau

C'est l'un des marqueurs les plus distinctifs du style de l'académie. Chaque fois que
c'est pertinent, l'explication doit rendre visible un mécanisme **interne** à
l'apprenant :

- **Dans la bouche / l'appareil vocal** : où va la langue, les lèvres s'arrondissent ou
  non, l'air passe par le nez ou la bouche, les cordes vocales vibrent ou non.
- **Dans l'oreille** : pourquoi tel son est difficile à distinguer pour cette audience
  (proximité avec un son de la langue source), pourquoi une liaison "fait disparaître"
  une frontière de mot à l'oral.
- **Dans le cerveau / le raisonnement** : pourquoi telle structure existe (quel
  problème de communication elle résout), pourquoi l'apprenant a tendance à faire telle
  erreur (transfert depuis sa langue source, sur-généralisation d'une règle apprise
  trop tôt).

**Avant (à éviter)** :
> "Le passé composé exprime une action ponctuelle dans le passé, contrairement à
> l'imparfait qui exprime une action habituelle ou un état."

**Après (style attendu)** :
> "Imagine que tu racontes un souvenir : il y a le **décor** (ce qui durait, ce qu'on
> voyait autour) et il y a **l'événement** (ce qui s'est passé, d'un coup). Ton cerveau
> fait déjà cette différence quand tu racontes une histoire dans ta langue — le
> français a juste deux 'cases' grammaticales différentes pour ces deux idées."

(Cet exemple correspond à l'analogie "peinture / photo" déjà utilisée dans
`seed-courses.json`, module Grammaire B1, leçon "L'imparfait" — voir
`03-pedagogie/examples/`.)

---

## Les analogies et métaphores

Les analogies sont **encouragées**, mais doivent respecter trois critères :

1. **Concrètes et sensorielles** : on peut les visualiser, les entendre, les ressentir
   (la boule de cristal, la colle Lego, les panneaux de signalisation).
2. **Universelles ou facilement transposables** : éviter les références culturelles
   trop locales qui ne parleraient pas à toutes les audiences (voir
   `01-strategie/strategie_multilingue.md`).
3. **Filées jusqu'au bout** : une analogie introduite doit être réutilisée dans la
   suite de la leçon (titres de sections, exemples, exercices) plutôt qu'abandonnée
   après l'introduction. C'est ce qui crée la sensation de parcours guidé plutôt que de
   succession de blocs indépendants.

**Avant (analogie gadget, non filée)** :
> "Le subjonctif, c'est un peu comme un mode mystérieux... Voici la conjugaison :"
> *(tableau de conjugaison sans lien avec le mystère évoqué)*

**Après (analogie filée)** :
> "Le subjonctif, c'est la planète des émotions : dès que tu exprimes un désir, une
> peur ou une nécessité *pour quelqu'un d'autre*, tu pars sur cette planète." → la
> leçon réutilise ensuite "planète des émotions" / "planète des faits" dans les
> exemples, les pièges et les exercices (voir `seed-courses.json`, "Le subjonctif
> présent").

---

## Anticiper les erreurs

Une erreur fréquente n'est jamais présentée comme une faute isolée. Elle est présentée
avec :

- **le mécanisme** qui la produit (souvent un transfert depuis la langue source, ou une
  sur-généralisation d'une règle vue précédemment) ;
- **la correction**, formulée positivement ("dis plutôt...", pas seulement "ne dis pas
  ...") ;
- **le public concerné**, via le champ `audience` (`Tous les apprenants`,
  `Italophones`, `Anglophones`, et au-delà selon
  `01-strategie/strategie_multilingue.md`).

**Avant** :
> "Erreur : 'Si j'aurais le temps...' C'est faux."

**Après** :
> "Après 'si', le conditionnel est interdit — même si à l'oral 'aurais' et la forme
> correcte se ressemblent. Mémo : après 'si', on ne pense qu'à deux temps : présent ou
> imparfait. ✅ Si j'avais le temps, je viendrais."

---

## Le ton émotionnel

- **Bienveillant** : l'erreur est normale, elle fait partie du chemin
  (`charte_pedagogique.md`, "L'erreur fait partie de l'apprentissage").
- **Encourageant sans infantiliser** : on s'adresse à des adultes. L'humour léger est
  bienvenu (scénettes, personnages récurrents), mais jamais au prix de la clarté.
- **Valorisant l'autonomie** : les formulations du type "maintenant tu peux..." ou "tu
  es capable de..." sont préférées à "tu dois retenir que...".

---

## Ce que nous évitons (rappel et précisions)

- Les **tableaux comme unique support d'explication** : un tableau peut résumer, jamais
  introduire seul une notion. Il doit toujours être précédé d'une explication ou d'une
  observation guidée.
- Les **listes de règles non contextualisées**.
- Les **définitions abstraites en ouverture** de section.
- Le **métalangage non expliqué** : si un terme grammatical est utilisé (ex.
  "subjonctif", "complément d'objet"), il doit être relié à une fonction concrète
  ("le mode des émotions et des doutes"), au moins la première fois qu'il apparaît
  pour un niveau donné.
- Les **exemples "hors-sol"** : toute phrase d'exemple doit pouvoir être prononcée par
  une vraie personne dans une vraie situation.
- Les **répétitions inter-sections** : une idée importante n'apparaît qu'une seule
  fois, dans la section la plus pertinente (cf. `course-generation-prompt.md`, règle 5).

---

## Check-list de relecture stylistique

Avant de soumettre une production, l'agent vérifie :

- [ ] La première chose que lit l'apprenant est une situation, une phrase ou une
      question — pas une définition.
- [ ] Au moins une fois, le texte explique *pourquoi* (mécanisme, raisonnement,
      transfert depuis la langue source), pas seulement *quoi*.
- [ ] Les règles sont formulées avec prudence (« généralement », « souvent »).
- [ ] Toute analogie introduite est réutilisée ailleurs dans la leçon.
- [ ] Chaque erreur fréquente propose une formulation positive de la correction.
- [ ] Aucun tableau n'est utilisé comme unique support d'une notion.
- [ ] Le tutoiement est utilisé dans la voix pédagogique (sauf illustration d'un
      registre formel dans le contenu lui-même).
- [ ] Une idée importante n'apparaît qu'une seule fois.

---

## Agents concernés

Quasiment tous les agents de production de contenu doivent lire ce document avant de
produire :

- Agent Architecte Pédagogique (cadrage du ton dès la conception) ;
- Agent Professeur Explicateur (application directe, primaire) ;
- Agent Grammaire, Agent Prononciation, Agent Exercices (application dans leur domaine) ;
- Agent Contrôle Qualité (utilise la check-list ci-dessus comme grille de validation) ;
- Agent Gestionnaire de Connaissances (détecte les dérives de style et propose des
  mises à jour de ce document).
