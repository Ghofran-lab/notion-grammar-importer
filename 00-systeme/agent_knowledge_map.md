# agent_knowledge_map.md

## Objectif

Ce document définit les sources de connaissances que chaque agent doit consulter avant d'exécuter sa mission.

L'objectif est de garantir :

- la cohérence des productions ;
- le respect de la pédagogie ;
- le respect de la mission de l'académie ;
- l'amélioration continue du système.

> **Note de cohérence (2026-06-11)** : ce document utilisait auparavant une convention de
> chemins `00_SYSTEM/`, `01_STRATEGIE/`, `03_PEDAGOGIE/`... qui ne correspondait à aucun dossier
> réel du dépôt (l'arborescence effective utilise `00-systeme/`, `01-strategie/`,
> `03-pedagogie/`, etc., voir `ARCHITECTURE.md`). Tous les chemins ci-dessous ont été corrigés
> pour pointer vers les emplacements réels. Tout agent ou script qui résout des chemins à partir
> de ce fichier doit utiliser exactement les chemins indiqués ici.

---

## Hiérarchie des connaissances

Lorsqu'une contradiction existe entre plusieurs documents, l'ordre de priorité est :

1. `03-pedagogie/examples/` (Golden Examples)
2. `03-pedagogie/style_pedagogique.md`
3. `03-pedagogie/charte_pedagogique.md`
4. `03-pedagogie/structure-des-cours.md`
5. `03-pedagogie/standards_qualite.md`
6. `03-pedagogie/niveaux_cecrl.md`
7. `01-strategie/strategie_multilingue.md`
8. `01-strategie/mission.md`
9. `01-strategie/vision.md`

Les exemples de référence ("golden examples") ont toujours priorité.

Les documents de philosophie spécifiques à un domaine (`philosophie_grammaire.md`,
`philosophie_prononciation.md`, `types_exercices.md`) s'appliquent **à l'intérieur** du
périmètre de leur agent et ne remplacent jamais un document de rang supérieur dans cette
hiérarchie : ils le précisent.

---

## Agent Orchestrateur

### Documents obligatoires

- `01-strategie/vision.md`
- `01-strategie/mission.md`
- `01-strategie/strategie_multilingue.md`
- `00-systeme/agents.md`
- `00-systeme/agent_knowledge_map.md`
- `00-systeme/workflow_agentique.md`

### Mission

- analyser la demande ;
- identifier la langue cible et le public (audience) concernés ;
- sélectionner les agents ;
- coordonner le travail ;
- assembler les résultats.

---

## Agent Architecte Pédagogique

### Documents obligatoires

- `01-strategie/mission.md`
- `01-strategie/strategie_multilingue.md`
- `03-pedagogie/charte_pedagogique.md`
- `03-pedagogie/structure-des-cours.md`
- `03-pedagogie/style_pedagogique.md`
- `03-pedagogie/niveaux_cecrl.md`
- `03-pedagogie/examples/`

### Mission

- définir les objectifs ;
- identifier les prérequis ;
- concevoir la progression ;
- identifier les difficultés ;
- calibrer le contenu sur le bon niveau CECRL.

---

## Agent Professeur Explicateur

### Documents obligatoires

- `03-pedagogie/charte_pedagogique.md`
- `03-pedagogie/style_pedagogique.md`
- `03-pedagogie/structure-des-cours.md`
- `03-pedagogie/niveaux_cecrl.md`
- `03-pedagogie/examples/`

### Mission

- rédiger les explications ;
- guider la réflexion ;
- accompagner l'apprenant ;
- rendre les notions accessibles.

---

## Agent Grammaire

### Documents obligatoires

- `03-pedagogie/philosophie_grammaire.md`
- `03-pedagogie/charte_pedagogique.md`
- `03-pedagogie/style_pedagogique.md`
- `03-pedagogie/niveaux_cecrl.md`
- `01-strategie/strategie_multilingue.md`
- `03-pedagogie/examples/`

### Mission

- produire les contenus grammaticaux ;
- expliquer les règles ;
- anticiper les erreurs fréquentes selon la langue source de l'apprenant.

---

## Agent Prononciation

### Documents obligatoires

- `03-pedagogie/philosophie_prononciation.md`
- `03-pedagogie/style_pedagogique.md`
- `03-pedagogie/charte_pedagogique.md`
- `03-pedagogie/niveaux_cecrl.md`
- `01-strategie/strategie_multilingue.md`
- `03-pedagogie/examples/`

### Mission

- expliquer les sons ;
- décrire les mouvements articulatoires ;
- construire des exercices de prononciation ;
- anticiper les erreurs selon la langue source de l'apprenant.

---

## Agent Exercices

### Documents obligatoires

- `03-pedagogie/types_exercices.md`
- `03-pedagogie/charte_pedagogique.md`
- `03-pedagogie/structure-des-cours.md`
- `03-pedagogie/style_pedagogique.md`
- `03-pedagogie/niveaux_cecrl.md`

### Mission

- créer des exercices ;
- créer une progression ;
- favoriser la réutilisation active.

---

## Agent Contrôle Qualité

### Documents obligatoires

- `03-pedagogie/standards_qualite.md`
- `03-pedagogie/style_pedagogique.md`
- `03-pedagogie/charte_pedagogique.md`
- `03-pedagogie/structure-des-cours.md`
- `03-pedagogie/niveaux_cecrl.md`
- `03-pedagogie/examples/`

### Mission

- valider ;
- rejeter ;
- demander des corrections.

---

## Agent Gestionnaire de Connaissances

### Documents obligatoires

- `00-systeme/agents.md`
- `00-systeme/agent_knowledge_map.md`
- `00-systeme/workflow_agentique.md`
- `01-strategie/vision.md`
- `01-strategie/strategie_multilingue.md`
- `03-pedagogie/` (ensemble du dossier)

### Mission

- identifier les améliorations possibles ;
- détecter les incohérences ;
- enrichir la documentation ;
- proposer de nouveaux documents ;
- maintenir la qualité globale du système.

---

## Agent Plateforme

### Documents obligatoires

- `03-pedagogie/structure-des-cours.md`
- `03-pedagogie/types_exercices.md`
- `01-strategie/strategie_multilingue.md`
- `05-donnees/`
- `04-operations/`

### Mission

- structurer les données ;
- préparer l'intégration applicative ;
- assurer la cohérence des formats.

---

## Agent Développeur Senior

### Documents obligatoires

- `00-systeme/agents.md`
- `00-systeme/agent_knowledge_map.md`
- `03-pedagogie/standards_qualite.md` (critère 7 — validité technique)
- `03-pedagogie/types_exercices.md` (section "Format technique")
- `01-strategie/strategie_multilingue.md` (champ `audience`, convention d'identifiants)
- `03-pedagogie/examples/` (annotations techniques destinées à cet agent)
- `04-operations/`
- `05-donnees/`

### Mission

- maintenir et faire évoluer l'application (`03-pedagogie/plateforme/`) ;
- étudier la faisabilité technique des besoins remontés par les autres agents
  (nouveaux types de section, nouveaux types d'exercices, ressources audio...) ;
- résoudre la dette technique signalée par les autres agents (ex. écart entre
  `seed-courses.json` et `courseGenerationSchema.js`) ;
- garantir la qualité, la sécurité et la maintenabilité du code.

---

## Agent Pédagogie Ludique (E-learning & Gamification)

### Documents obligatoires

- `03-pedagogie/types_exercices.md` (section "Lien avec la gamification et
  l'expérience apprenant")
- `03-pedagogie/charte_pedagogique.md`
- `03-pedagogie/style_pedagogique.md`
- `01-strategie/vision.md`
- `03-pedagogie/examples/`

### Mission

- concevoir les mécaniques de motivation et de progression (retours de réussite,
  séries, paliers, récompenses) ;
- habiller les exercices conçus par l'Agent Exercices sans en modifier l'objectif
  pédagogique ;
- anticiper les effets pervers d'une mécanique ludique (anxiété de performance,
  compétition mal calibrée).

---

## Agent UX-UI

### Documents obligatoires

- `03-pedagogie/style_pedagogique.md`
- `03-pedagogie/charte_pedagogique.md`
- `01-strategie/vision.md`
- `03-pedagogie/types_exercices.md`
- `03-pedagogie/examples/`

### Mission

- concevoir les parcours apprenant (navigation, progression, retours visuels,
  accessibilité) ;
- garantir la cohérence visuelle de la plateforme (design system) ;
- traduire en interface concrète les principes d'accompagnement de
  `style_pedagogique.md`.

---

## Golden Examples

Les documents du dossier `03-pedagogie/examples/` sont considérés comme les meilleures
références pédagogiques de l'académie.

Tous les agents doivent les consulter lorsqu'ils existent.

Ils représentent :

- le ton attendu ;
- le niveau de détail attendu ;
- le niveau de qualité attendu ;
- le style pédagogique attendu.

---

## Règle absolue

Avant toute production :

1. Lire les documents obligatoires.
2. Vérifier les exemples de référence.
3. Vérifier les standards qualité.
4. Identifier les informations manquantes.
5. Produire.
6. Auto-évaluer le résultat à l'aide de `03-pedagogie/standards_qualite.md`.
7. Proposer des améliorations si nécessaire.
