# 03-pedagogie/examples/ — Golden Examples

## Objectif

Ce dossier contient les **Golden Examples** : des contenus pédagogiques réels,
**annotés**, qui illustrent de façon concrète comment appliquer ensemble
`charte_pedagogique.md`, `style_pedagogique.md`, `structure-des-cours.md`,
`philosophie_grammaire.md`, `philosophie_prononciation.md`, `types_exercices.md` et
`niveaux_cecrl.md`.

Ce dossier est la **première référence consultée par tout agent de production**
(`00-systeme/agent_knowledge_map.md`, position 1 de la hiérarchie de connaissances) :
en cas de doute sur une formulation, une progression ou un format, un Golden Example
prévaut sur la description abstraite d'un principe — et si un Golden Example contredit
un autre document, c'est ce document qui doit être mis à jour
(`00-systeme/workflow_agentique.md`, "Intégration d'un Golden Example").

---

## Pourquoi des exemples annotés plutôt que de simples extraits

Un extrait de cours montre *quoi* a été produit. Une annotation explique *pourquoi*
c'est une référence — quel principe est appliqué, à quel endroit, et comment il se
manifeste concrètement dans le texte.

Chaque Golden Example de ce dossier suit donc la même convention :

> 🟢 **Pourquoi cet exemple est une référence**
> *(note d'annotation expliquant le principe illustré et le document de référence
> correspondant)*

Ces annotations s'adressent **aux agents** (et aux humains qui les supervisent), pas
aux apprenants : elles n'apparaissent jamais dans le contenu publié sur la plateforme.

---

## Critères d'inclusion

Un contenu peut être proposé comme Golden Example par l'Agent Gestionnaire de
Connaissances (`00-systeme/workflow_agentique.md`, "Intégration d'un Golden Example")
s'il :

- a été **Validé** sans réserve par l'Agent Contrôle Qualité
  (`standards_qualite.md`) ;
- illustre **plusieurs principes à la fois** de façon particulièrement réussie (et pas
  seulement "correct") ;
- couvre une combinaison niveau / domaine pas encore représentée dans ce dossier, pour
  garder une diversité utile (grammaire et prononciation, différents niveaux CECRL,
  différentes langues cibles à terme — `01-strategie/strategie_multilingue.md`).

---

## Golden Examples disponibles

| Fichier | Niveau | Domaine | Ce qu'il illustre principalement |
| --- | --- | --- | --- |
| [`GE-B1-GRAM-001-imparfait.md`](./GE-B1-GRAM-001-imparfait.md) | B1 | Grammaire (verbes) | Analogie filée jusqu'au bout ("peinture / photo"), progression découverte → règle → pratique, anticipation des erreurs par transfert (`philosophie_grammaire.md`). |
| [`GE-A2-PRON-001-la-liaison.md`](./GE-A2-PRON-001-la-liaison.md) | A2 | Prononciation | Progression perception → production, transcription simplifiée, approche contrastive, dédramatisation (`philosophie_prononciation.md`). |

---

## Comment utiliser ce dossier

1. Avant de produire un contenu, parcourir ce tableau et ouvrir l'exemple le plus
   proche du domaine et du niveau visés.
2. Repérer les annotations 🟢 pertinentes pour la tâche en cours.
3. Si la tâche en cours ressemble fortement à un Golden Example mais que ce dernier ne
   couvre pas un cas rencontré (ex. nouvelle langue cible, nouveau type d'exercice),
   appliquer le **principe** illustré, pas le contenu littéral — puis signaler le cas
   non couvert à l'Agent Gestionnaire de Connaissances.

---

## Agents concernés

- Tous les agents de production de contenu (consultation obligatoire,
  `00-systeme/agent_knowledge_map.md`).
- Agent Gestionnaire de Connaissances (maintien de ce dossier, ajout de nouveaux
  exemples via `00-systeme/workflow_agentique.md`).
- Agent Contrôle Qualité (référence de comparaison lors de la validation).
