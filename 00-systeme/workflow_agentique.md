workflow_agentique.md

Workflow Agentique de l'Académie

Objectif

Définir comment les agents collaborent afin de produire des contenus pédagogiques cohérents, fiables et conformes à la pédagogie de l'académie.

Ce document décrit les flux de travail standard du système.

---

Principe général

Les agents ne travaillent jamais en parallèle sans coordination.

Chaque agent intervient au moment où son expertise est nécessaire.

Le travail suit une progression logique.

---

Workflow : Création d'un cours

Étape 1 : Réception de la demande

Responsable

Agent Orchestrateur

Exemple de demande

Créer un cours sur :

- Le passé composé
- Niveau A2
- Français

Actions

- Analyse la demande.
- Identifie les agents nécessaires.
- Prépare le contexte.

---

Étape 2 : Conception pédagogique

Responsable

Agent Architecte Pédagogique

Livrables

- objectifs ;
- prérequis ;
- difficultés ;
- progression ;
- compétences travaillées.

Sortie

Fiche pédagogique.

---

Étape 3 : Construction du contenu

Responsable

Agent Professeur Explicateur

Actions

- crée la mise en situation ;
- crée la découverte ;
- crée les explications ;
- crée les exemples.

Sortie

Version pédagogique du cours.

---

Étape 4 : Expertise linguistique

Responsable

Agent Grammaire ou Agent Prononciation

Actions

- vérifie l'exactitude ;
- complète les explications ;
- identifie les erreurs fréquentes ;
- enrichit les exemples.

Sortie

Version enrichie.

---

Étape 5 : Création des exercices

Responsable

Agent Exercices

Actions

- crée les activités ;
- construit la progression ;
- favorise la réutilisation.

Sortie

Pack d'activités.

---

Étape 6 : Contrôle qualité

Responsable

Agent Contrôle Qualité

Vérifications

- exactitude ;
- cohérence ;
- niveau CECRL ;
- respect de la charte ;
- respect du style pédagogique ;
- respect de la structure des cours.

Décision

- validé ;
- à corriger ;
- rejeté.

---

Étape 7 : Structuration plateforme

Responsable

Agent Plateforme

Actions

- prépare les métadonnées ;
- structure les données ;
- prépare l'intégration dans l'application.

Sortie

Version exploitable par la plateforme.

---

Étape 8 : Expérience et gamification

Responsable

Agent UX-UI et Agent Pédagogie Ludique (E-learning & Gamification)

Actions

- déterminer comment présenter le contenu validé (mise en page, retours visuels) ;
- identifier les mécaniques de motivation pertinentes pour ce contenu
  (`03-pedagogie/types_exercices.md`, "Lien avec la gamification") ;
- signaler tout besoin non couvert par l'interface ou les mécaniques existantes.

Sortie

Spécification d'expérience (présentation et, le cas échéant, mécaniques de
gamification associées).

---

Workflow : Amélioration continue

Déclencheur

Après chaque production validée.

Responsable

Agent Gestionnaire de Connaissances

Analyse

- difficultés rencontrées ;
- erreurs répétées ;
- ambiguïtés documentaires ;
- opportunités d'amélioration.

Sortie

Proposition d'amélioration.

---

Workflow : Création d'un nouveau document système

Responsable

Agent Gestionnaire de Connaissances

Déclencheurs

- information manquante ;
- problème récurrent ;
- nouvelle pratique identifiée ;
- besoin d'un nouvel agent.

Sortie

Proposition :

- nouveau document ;
- modification ;
- enrichissement.

---

Workflow : Évolution technique de la plateforme

Déclencheur

- signalement d'un écart technique par un agent de production ou de contrôle (type de
  section, type d'exercice ou champ de données non supporté par
  `courseGenerationSchema.js` ou par l'application) ;
- proposition d'un nouveau type d'exercice ou d'une nouvelle ressource (ex. audio)
  dans `03-pedagogie/types_exercices.md` ou dans un Golden Example
  (`03-pedagogie/examples/`).

Responsable

Agent Développeur Senior

Actions

- évaluer la faisabilité technique et l'impact sur le schéma et l'application
  existante ;
- soit implémenter le changement, soit proposer une alternative argumentée à l'agent
  demandeur ;
- mettre à jour, en lien avec l'Agent Gestionnaire de Connaissances, la documentation
  technique concernée (`03-pedagogie/types_exercices.md`,
  `03-pedagogie/standards_qualite.md`).

Résultat

Évolution technique livrée, ou alternative argumentée transmise à l'agent demandeur.

---

Workflow : Intégration d'un Golden Example

Déclencheur

Identification d'un excellent contenu.

Responsable

Agent Gestionnaire de Connaissances

Actions

- analyser le contenu ;
- identifier les forces ;
- documenter les bonnes pratiques ;
- intégrer dans `03-pedagogie/examples/`.

Résultat

Nouvelle référence pédagogique.

---

Principe de validation humaine

Les décisions suivantes nécessitent une validation humaine :

- modification de la mission ;
- modification de la charte pédagogique ;
- modification du style pédagogique ;
- création ou suppression d'agents ;
- intégration d'un Golden Example ;
- modification des standards qualité ;
- modification du schéma de génération (`courseGenerationSchema.js`) ou de toute
  structure de données partagée.

---

Objectif final du système

Créer un système capable de :

- produire des contenus pédagogiques de haute qualité ;
- apprendre de ses productions ;
- améliorer progressivement sa base documentaire ;
- rester fidèle à la pédagogie de l'académie ;
- faciliter la création massive de ressources tout en conservant une approche humaine.