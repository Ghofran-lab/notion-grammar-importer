# philosophie_grammaire.md

## Objectif

Ce document définit la **démarche** de l'académie pour enseigner la grammaire. Il
complète `03-pedagogie/style_pedagogique.md` (comment écrire) et
`03-pedagogie/charte_pedagogique.md` (principes généraux) avec des règles spécifiques au
travail grammatical.

Comme `philosophie_prononciation.md`, ce document est **transversal**
(`01-strategie/strategie_multilingue.md`) : il décrit une démarche valable pour
n'importe quelle langue cible. Les exemples cités sont en français à titre
d'illustration.

C'est le document de référence principal de l'Agent Grammaire.

---

## La grammaire est une carte mentale, pas un code de la route

Un code de la route impose des règles arbitraires qu'il faut mémoriser ("tourner à
droite est interdit ici"). Une carte mentale, elle, **représente comment les locuteurs
organisent le sens** : pourquoi cette langue distingue ceci de cela, pourquoi tel ordre
des mots semble naturel.

Conséquence directe : une explication grammaticale réussie ne dit pas seulement
*"voici la règle"*, elle dit *"voici le problème de communication que cette règle
résout"*. Si l'agent ne peut pas formuler ce problème, c'est que la règle a été choisie
trop tôt, ou présentée hors contexte.

**Avant** :
> "Le subjonctif s'emploie après certains verbes et locutions exprimant la volonté, le
> doute, l'émotion ou la nécessité."

**Après** :
> "Quand tu parles de faits certains, tu restes sur la 'planète des faits'. Mais dès que
> tu exprimes un souhait, une peur ou une obligation *pour quelqu'un d'autre que toi*,
> tu changes de monde — et la forme du verbe change avec toi."

---

## Toujours partir d'un besoin de communication

Avant de produire une explication, l'agent identifie **la situation où cette règle est
indispensable** : sans elle, qu'est-ce que l'apprenant ne pourrait pas dire ou
comprendre ?

- Si la règle sert surtout à "bien écrire" sans changer le sens à l'oral (ex. accords
  silencieux), le besoin de communication est plus faible : la règle peut être
  introduite plus tard, ou présentée comme secondaire (`warning`) plutôt que comme
  cœur de leçon.
- Si la règle change le sens ou évite un malentendu (ex. confondre "je voudrais" et
  "je veux" dans un contexte de politesse), elle mérite d'être au centre de la leçon.

---

## La règle d'or de la formulation : prudence

Une langue vivante a des tendances, rarement des lois absolues. L'agent formule donc :

- "généralement", "souvent", "dans la plupart des cas" pour une tendance forte ;
- une règle absolue **uniquement** si elle n'a, à la connaissance de l'agent, aucune
  exception pertinente au niveau visé (ex. "après *si*, on ne met jamais le
  conditionnel").

Transformer une tendance en règle absolue est **un critère rédhibitoire** au sens de
`03-pedagogie/standards_qualite.md` : l'apprenant qui rencontre l'exception perdra
confiance dans toute la leçon.

---

## Progression : découverte avant explication

L'ordre privilégié (détaillé dans `structure-des-cours.md`) appliqué à la grammaire :

1. **Le contexte** : l'apprenant rencontre la structure dans une situation
   (dialogue, histoire, message).
2. **L'observation guidée** : une question ouverte pousse l'apprenant à formuler une
   hypothèse ("Que remarques-tu sur la fin de ces verbes ?").
3. **La confirmation / l'affinement** : l'agent confirme ou affine l'hypothèse de
   l'apprenant — il ne lui apprend jamais quelque chose qu'il vient de découvrir comme
   si de rien n'était.
4. **La règle**, formulée avec prudence (voir ci-dessus).
5. **Des exemples variés**, ancrés dans la vie réelle.
6. **La pratique**, du plus guidé au plus autonome (`types_exercices.md`).

---

## Anticiper les erreurs : penser en termes de transfert

La majorité des erreurs grammaticales d'un apprenant adulte viennent d'un
**transfert** : il applique, sans s'en rendre compte, une règle de sa langue source à
la langue cible.

Pour chaque règle importante, l'agent se pose la question : *"Comment cette règle
fonctionne-t-elle dans les langues sources les plus fréquentes pour ce cours ?"*
(`01-strategie/strategie_multilingue.md` indique quelles langues sources prioriser
selon la langue cible).

- Si le fonctionnement est **proche**, l'apprenant transférera correctement — pas
  besoin d'insister.
- Si le fonctionnement **diffère**, c'est une erreur fréquente probable : à documenter
  dans une section `common_mistakes` avec le bon `audience`.
- Si une même erreur concerne **toutes les audiences** (ex. sur-généralisation d'une
  règle vue dans une leçon précédente), elle est documentée avec `audience: "Tous les
  apprenants"`.

**Ne jamais** dupliquer l'explication de la règle générale dans chaque entrée
`common_mistakes` : seule la **différence** est décrite (`course-generation-prompt.md`,
règle 8).

---

## Le métalangage : un outil, pas un objectif

Les termes grammaticaux techniques (subjonctif, complément d'objet direct, pronom
relatif...) ne sont pas interdits, mais :

- ils sont **toujours associés à une fonction concrète** lors de leur première
  apparition à un niveau donné ("le subjonctif = le mode des émotions et des doutes") ;
- ils ne sont **jamais le point de départ** d'une explication ;
- au niveau A1-A2, on privilégie les descriptions fonctionnelles ("le mot qui
  remplace...") aux termes techniques lorsque c'est possible.

---

## Gérer les exceptions

Une règle de grammaire a presque toujours des cas particuliers. L'agent applique ce
filtre :

1. L'exception est-elle **fréquente** dans l'usage courant au niveau visé ? Si oui,
   elle peut être incluse — brièvement, dans une section `warning` plutôt que noyée
   dans la règle principale.
2. L'exception est-elle **rare ou de niveau supérieur** ? Elle est explicitement
   reportée à une prochaine leçon (`niveaux_cecrl.md`, "Passerelles entre niveaux"),
   jamais simplement omise sans mention si elle risque d'être rencontrée rapidement par
   l'apprenant.
3. Une **liste exhaustive d'exceptions** n'a sa place dans aucune leçon : elle relève,
   au mieux, d'une fiche mémo complémentaire (`structure-des-cours.md`, section 12).

---

## Grammaire et prononciation : qui fait quoi

Certaines règles grammaticales ont un impact à l'oral (accord audible au féminin,
liaison obligatoire, élision). Dans ce cas :

- l'Agent Grammaire **signale** l'impact oral (souvent via une section `warning`,
  comme dans l'exemple "petit/petite" de `seed-courses.json`) ;
- le **détail articulatoire** (comment se prononce le son qui apparaît/disparaît) relève
  de l'Agent Prononciation et de `03-pedagogie/philosophie_prononciation.md`.

---

## Agents concernés

- Agent Grammaire (primaire).
- Agent Architecte Pédagogique (vérifie que le besoin de communication est identifié
  dès la conception).
- Agent Contrôle Qualité (vérifie la prudence des formulations et la gestion des
  exceptions, voir `standards_qualite.md`).
- Agent Professeur Explicateur (intègre les explications grammaticales dans le récit
  global de la leçon).
- Agent Gestionnaire de Connaissances (capitalise les patterns de transfert identifiés
  pour enrichir `01-strategie/strategie_multilingue.md` et les futurs documents
  `03-pedagogie/langues/<code>/erreurs-frequentes.md`).
