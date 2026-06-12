# standards_qualite.md

## Objectif

Ce document est la grille de validation utilisée par l'Agent Contrôle Qualité (étape 6
de `00-systeme/workflow_agentique.md`), et la grille d'auto-évaluation que **tout
agent** doit appliquer à sa propre production avant de la transmettre (règle absolue de
`00-systeme/agent_knowledge_map.md`, étape 6).

Il transforme les principes de `charte_pedagogique.md` et `style_pedagogique.md` en
**critères vérifiables**, classés par niveau de gravité.

---

## Les trois décisions possibles

| Décision | Signification | Conséquence |
| --- | --- | --- |
| **Validé** | Aucun critère rédhibitoire violé ; les améliorations souhaitables sont satisfaites ou mineures. | Le contenu passe à l'étape suivante du workflow. |
| **À corriger** | Un ou plusieurs critères rédhibitoires sont violés, mais la structure générale est saine. | Retour à l'agent producteur avec une liste précise de corrections (voir format ci-dessous). |
| **Rejeté** | La production ne correspond pas à la demande, ou viole un principe de `charte_pedagogique.md` / `style_pedagogique.md` de manière structurelle (ex. cours organisé comme une fiche de grammaire). | Retour à l'Agent Architecte Pédagogique : la conception doit être revue, pas seulement le texte. |

L'Agent Contrôle Qualité ne corrige jamais lui-même le contenu : il décrit le problème
et le document de référence concerné, et renvoie à l'agent compétent.

---

## Critères rédhibitoires (bloquent la validation)

### 1. Conformité à la mission et à la charte

- [ ] Le cours aide à **communiquer**, pas seulement à connaître une règle
      (`charte_pedagogique.md`, "Critère ultime").
- [ ] La conversation / réutilisation communicative est présente et n'est pas une
      simple case cochée en fin de parcours.
- [ ] Aucune section ne ressemble à une fiche de grammaire, une page d'encyclopédie ou
      une liste de règles isolées.

### 2. Conformité à la structure des cours

- [ ] Les sections suivent l'ordre et l'esprit de `structure-des-cours.md` (mise en
      situation → compréhension → vocabulaire → observation → explication → exemples →
      pratique guidée → pratique semi-autonome → réutilisation → synthèse).
- [ ] Les métadonnées requises sont présentes et cohérentes (identifiant, niveau CECRL,
      langue, objectif communicatif, prérequis).
- [ ] Au moins un exercice est présent et relié à l'objectif d'apprentissage.

### 3. Conformité au style pédagogique

- [ ] La check-list de relecture de `style_pedagogique.md` est satisfaite (ancrage en
      ouverture, "pourquoi" présent, règles formulées avec prudence, analogies filées,
      erreurs reformulées positivement, tutoiement).
- [ ] Aucune idée importante n'est répétée dans plusieurs sections.

### 4. Calibration CECRL

- [ ] Le niveau annoncé correspond à `niveaux_cecrl.md` : densité grammaticale,
      vocabulaire, exigence de précision et type de mise en situation cohérents avec le
      niveau.
- [ ] Aucune notion d'un niveau supérieur n'est introduite sans avertissement explicite
      et renvoi à une prochaine leçon.

### 5. Exactitude linguistique

- [ ] La règle principale est correcte et formulée avec la prudence requise
      (`philosophie_grammaire.md`).
- [ ] Les transcriptions de prononciation, lorsque présentes, sont cohérentes avec
      `philosophie_prononciation.md`.
- [ ] Les exemples sont naturels et utilisables tels quels par un locuteur réel.

### 6. Cohérence multilingue

- [ ] Chaque erreur fréquente possède un champ `audience` correct et cohérent avec
      `01-strategie/strategie_multilingue.md` (langue cible / langue(s) source(s) de la
      fiche de demande).
- [ ] Aucune règle générale n'est dupliquée pour chaque audience : seules les
      différences sont décrites séparément (cf. `course-generation-prompt.md`, règle 8).

### 7. Validité technique

- [ ] La sortie respecte le format attendu par `03-pedagogie/plateforme/` (types de
      sections et de champs reconnus — voir
      `03-pedagogie/plateforme/src/services/courseGenerationSchema.js`).
- [ ] Tous les identifiants (`internal_id`) respectent la convention en vigueur
      (`01-strategie/strategie_multilingue.md` pour les nouvelles langues cibles).

> Si un type de section ou de champ utilisé dans la production n'existe pas encore dans
> le schéma technique, l'Agent Contrôle Qualité ne bloque pas la production pour ce seul
> motif, mais le signale à l'Agent Plateforme et à l'Agent Gestionnaire de Connaissances.
> Cas déjà rencontré et résolu : les types `analogy` et `story`, d'abord présents dans
> `seed-courses.json` sans être formellement décrits dans `courseGenerationSchema.js`,
> y sont désormais pleinement supportés.

---

## Améliorations souhaitables (n'empêchent pas la validation)

Ces points sont notés pour le suivi qualité global mais ne justifient pas un retour
"À corriger" isolé :

- variété des formats d'exercices au sein d'un même module (`types_exercices.md`) ;
- richesse des analogies (éviter de réutiliser la même image d'un module à l'autre sans
  raison) ;
- équilibre entre humour et clarté ;
- opportunités d'enrichir `03-pedagogie/examples/` si la production atteint un niveau
  de qualité exceptionnel (voir `00-systeme/workflow_agentique.md`, "Intégration d'un
  Golden Example").

---

## Format de retour "À corriger"

Pour rester actionnable, un retour de l'Agent Contrôle Qualité suit ce format :

```text
Décision : À corriger

1. [Critère violé] — [Document de référence, section]
   Constat : ...
   Attendu : ...

2. [Critère violé] — [Document de référence, section]
   Constat : ...
   Attendu : ...

Agent(s) concerné(s) : [Agent Grammaire / Agent Exercices / ...]
```

Chaque point doit citer le document de référence violé. Un retour qui ne cite aucun
document n'est pas un retour qualité valable — c'est un avis personnel.

---

## Auto-évaluation (tous les agents)

Avant de transmettre une production, chaque agent applique cette même grille à son
propre travail, en se concentrant sur les sections pertinentes à son périmètre :

1. Relire les critères rédhibitoires concernant son domaine.
2. Cocher mentalement la check-list de `style_pedagogique.md`.
3. Identifier une amélioration possible, même si elle n'est pas appliquée
   immédiatement, et la signaler dans sa sortie ("Piste d'amélioration : ...").

Cette étape correspond aux points 6 et 7 de la "Règle absolue" de
`00-systeme/agent_knowledge_map.md`.

---

## Agents concernés

- Agent Contrôle Qualité (primaire, applique la grille complète).
- Tous les agents de production (auto-évaluation avant soumission).
- Agent Gestionnaire de Connaissances (analyse les motifs de rejet récurrents pour
  proposer des évolutions de la base de connaissances).
