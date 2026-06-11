# niveaux_cecrl.md

## Objectif

Le CECRL (A1 → C2) est une échelle générale. Ce document traduit cette échelle en
**décisions concrètes pour l'académie** : que peut-on raisonnablement mettre dans un
cours A1 ? Combien de notions par leçon en B1 ? Quel niveau d'exigence de précision en
B2 ?

Sans ce document, deux agents peuvent produire un contenu « correct » au sens du CECRL
mais incohérent l'un avec l'autre (un A1 trop dense, un B1 trop simple). Ce document est
la référence de calibration pour l'Agent Architecte Pédagogique (conception) et l'Agent
Contrôle Qualité (validation).

Ce document est **transversal** (voir `01-strategie/strategie_multilingue.md`) : il
s'applique à toute langue cible. Les exemples utilisés sont en français à titre
d'illustration.

L'académie ne cible pas le niveau C2 pour le moment : il n'est pas décrit ici. Il pourra
être ajouté lorsque des parcours avancés (perfectionnement, usage professionnel pointu)
seront développés.

---

## Principe général de calibration

Pour chaque niveau, on se pose systématiquement quatre questions :

1. **Que sait déjà faire l'apprenant en arrivant à ce niveau ?** (prérequis réalistes)
2. **De quoi a-t-il besoin pour communiquer dans des situations propres à ce niveau ?**
3. **Combien de notions nouvelles une leçon peut-elle introduire sans surcharger ?**
4. **Quel niveau d'exactitude est réaliste à exiger dans les exercices de production ?**

La réponse à la question 4 est cruciale : exiger une précision de niveau B2 dans un
exercice A2 transforme un exercice de communication en exercice de perfectionnisme, ce
que `03-pedagogie/charte_pedagogique.md` interdit.

---

## A1 — Survivre et se présenter

**Prérequis** : aucun, ou quelques mots isolés.

**Objectifs communicatifs typiques** :

- se présenter, présenter quelqu'un ;
- décrire son environnement immédiat (famille, logement, objets du quotidien) ;
- gérer des échanges courts et prévisibles (achats simples, salutations, heure, météo) ;
- poser et répondre à des questions très simples sur des sujets familiers.

**Densité grammaticale par leçon** : **une seule** notion nouvelle, présentée comme un
outil pour une situation précise (ex. « pour dire ce que tu fais habituellement » →
présent). Pas de combinaison de deux temps ou de deux structures nouvelles dans la même
leçon.

**Vocabulaire** : très haute fréquence, champs lexicaux concrets (famille, nourriture,
ville, transports, nombres, heure). Pas de vocabulaire abstrait.

**Exigence de précision** : tolérance haute. L'objectif est d'être compris, pas d'être
exact. Les erreurs de genre, d'accord ou de conjugaison ne doivent jamais bloquer une
activité de production — elles sont notées comme pistes de progrès.

**Mise en situation** : contextes très concrets et universels (au marché, à l'hôtel, au
téléphone avec un ami, remplir un formulaire simple).

**Pièges de calibration fréquents** :

- vouloir « tout dire » sur un temps verbal (ex. présenter toutes les irrégularités du
  présent) → réserver les irrégularités les plus utiles, renvoyer le reste ;
- utiliser des phrases d'exemple grammaticalement correctes mais syntaxiquement trop
  longues pour un A1.

---

## A2 — Communiquer dans des tâches simples et habituelles

**Prérequis** : présent, vocabulaire de base A1, capacité à former des phrases simples.

**Objectifs communicatifs typiques** :

- raconter des événements passés simples et des habitudes ;
- exprimer des projets proches, des envies, des besoins ;
- comparer (deux objets, deux situations) ;
- gérer des échanges un peu plus longs (réservation, petite négociation, excuses).

**Densité grammaticale par leçon** : une notion nouvelle principale, éventuellement mise
en **contraste** avec une notion déjà connue (ex. passé composé vs présent), mais sans
introduire un troisième temps.

**Vocabulaire** : fréquence moyenne-haute, premiers connecteurs simples (et, mais, donc,
parce que), premiers adverbes de fréquence et de temps.

**Exigence de précision** : tolérance encore haute, mais on commence à signaler — sans
sanctionner — les erreurs qui gênent la compréhension (ex. confusion temporelle qui rend
un récit incompréhensible).

**Mise en situation** : récits courts, échanges de la vie quotidienne avec un peu plus
d'enjeu (rendez-vous, achats avec choix, premiers échanges professionnels simples).

**Pièges de calibration fréquents** :

- introduire l'imparfait et le passé composé dans la même leçon sans dire clairement
  lequel est la priorité de la leçon ;
- proposer des mises en situation trop abstraites (débats d'opinion) qui relèvent de B1.

---

## B1 — S'exprimer avec autonomie sur des sujets familiers

**Prérequis** : présent, passé composé, futur proche, vocabulaire A2 solide.

**Objectifs communicatifs typiques** :

- raconter, expliquer, justifier un choix ou une opinion simple ;
- gérer la plupart des situations rencontrées en voyage ou au travail dans un contexte
  familier ;
- comprendre l'essentiel d'un message clair sur des sujets concrets ou abstraits
  courants ;
- produire un discours simple et cohérent sur des sujets familiers ou d'intérêt
  personnel.

**Densité grammaticale par leçon** : une notion nouvelle, qui peut être **mise en
système** avec les notions déjà vues (ex. imparfait vs passé composé, futur vs
conditionnel). C'est le niveau où les comparaisons entre formes proches deviennent
pertinentes (`comparison_table`).

**Vocabulaire** : élargissement vers l'expression d'opinions, de sentiments, de
nuances ; premiers connecteurs logiques plus variés (cause, conséquence, opposition,
concession — voir `seed-courses.json`, module Grammaire B1).

**Exigence de précision** : on attend une **correction fonctionnelle** : la phrase peut
comporter de petites erreurs, mais la structure ciblée par la leçon doit être
globalement maîtrisée en fin de parcours sur cette notion. C'est le niveau où les
sections `common_mistakes` prennent toute leur importance.

**Mise en situation** : récits personnels, opinions, anecdotes, situations
professionnelles courantes, discours rapporté.

**Pièges de calibration fréquents** :

- sous-exploiter le niveau B1 en restant sur des mises en situation A2 (trop
  descriptives, pas assez argumentatives) ;
- survaloriser l'exactitude grammaticale au détriment de la fluidité — contraire à la
  charte.

---

## B2 — Argumenter et nuancer

**Prérequis** : ensemble des temps et modes courants (indicatif, conditionnel,
subjonctif de base), vocabulaire B1 solide.

**Objectifs communicatifs typiques** :

- argumenter, nuancer, défendre un point de vue, anticiper des objections ;
- comprendre des contenus plus complexes (débats, articles, discussions techniques dans
  son domaine) ;
- s'exprimer avec spontanéité dans une interaction avec un locuteur natif, sans tension
  excessive pour l'un ou l'autre.

**Densité grammaticale par leçon** : une notion nouvelle, mais souvent **au service
d'un objectif de discours** (nuancer, structurer une argumentation, exprimer
l'hypothèse). La grammaire devient un outil de précision rhétorique plus qu'un outil de
survie.

**Vocabulaire** : registres différenciés (familier / standard / soutenu), expressions
idiomatiques courantes, vocabulaire spécialisé selon les besoins de l'apprenant
(professionnel, académique).

**Exigence de précision** : on peut exiger une correction plus fine sur les structures
ciblées, et commencer à travailler le **registre** (ex. « par contre » à l'oral vs « en
revanche » à l'écrit, déjà présent dans `seed-courses.json`).

**Mise en situation** : débats, prises de position, situations professionnelles
exigeantes, compréhension de documents authentiques.

**Pièges de calibration fréquents** :

- continuer à utiliser des mises en situation « scolaires » alors que l'apprenant B2 a
  besoin de matériel authentique ou quasi authentique ;
- négliger le travail sur les registres de langue.

---

## C1 — Maîtriser et nuancer finement

**Prérequis** : ensemble du système grammatical, aisance B2 confirmée.

**Objectifs communicatifs typiques** :

- s'exprimer spontanément et couramment, presque sans recherche de mots ;
- utiliser la langue de manière flexible et efficace dans la vie sociale,
  professionnelle et académique ;
- comprendre une grande gamme de textes longs et exigeants, en saisir les implicites.

**Densité grammaticale par leçon** : les notions nouvelles sont rares ; le travail
porte surtout sur la **finesse** (nuances stylistiques, structures peu fréquentes mais
précises, cohésion textuelle), souvent à partir de documents authentiques.

**Vocabulaire** : précision lexicale, collocations, nuances de sens entre synonymes,
implicite culturel.

**Exigence de précision** : haute, y compris sur des points fins (concordance des
temps, registre, nuances modales). On peut désormais signaler des erreurs qui ne
gênent pas la compréhension mais qui trahissent un niveau non natif.

**Mise en situation** : matériaux authentiques (articles, extraits littéraires,
réunions professionnelles complexes), production de textes structurés et nuancés.

**Pièges de calibration fréquents** :

- proposer des leçons C1 qui sont en réalité des leçons B2 « avec du vocabulaire plus
  dur » sans réel gain de finesse communicative ;
- négliger la dimension culturelle/implicite, pourtant centrale à ce niveau.

---

## Passerelles entre niveaux

Un apprenant ne change pas de niveau du jour au lendemain. Chaque cours doit donc :

- rappeler brièvement (sans la reprendre en détail) une notion du niveau précédent
  lorsqu'elle est nécessaire à la nouvelle notion (ex. un cours B1 sur l'imparfait
  rappelle le passé composé) ;
- éviter d'introduire silencieusement une notion d'un niveau supérieur : si c'est
  nécessaire, le signaler explicitement (`warning`) et renvoyer à une prochaine leçon —
  pratique déjà en place dans `course-generation-prompt.md` (« la liaison sera étudiée
  dans une prochaine leçon »).

---

## Articulation avec les autres documents

- `03-pedagogie/structure-des-cours.md` définit le **squelette** d'un cours ; ce document
  définit le **curseur de difficulté** à l'intérieur de ce squelette.
- `03-pedagogie/standards_qualite.md` utilise ce document comme grille de contrôle de la
  calibration CECRL.
- `03-pedagogie/types_exercices.md` s'appuie sur ce document pour déterminer le niveau
  d'autonomie attendu d'un exercice à un niveau donné.

## Agents concernés

- Agent Architecte Pédagogique (primaire) : calibre objectifs, prérequis et progression.
- Agent Contrôle Qualité (primaire) : vérifie la cohérence du niveau annoncé.
- Agent Grammaire / Agent Prononciation / Agent Exercices : adaptent la densité et
  l'exigence de précision de leur production au niveau de la fiche de demande.
