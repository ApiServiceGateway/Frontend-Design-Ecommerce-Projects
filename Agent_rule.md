# Agent Rules & Guidelines

> **Purpose**: This document establishes mandatory rules and operating standards for any AI agent or contributor working within this repository. Adherence to these rules is mandatory before initiating, planning, executing, or concluding any task.

---

## Core Rules

### 1. Read the Rules Before Starting
* **Action**: Prior to starting any task, read this `Agent_rule.md` file completely.
* **Context Review**: Review all relevant and approved project documentation, architecture decisions, and examine the code directly related to the assigned task.

---

### 2. Change Only What the Task Requires
* **Scope Discipline**: Make strictly the changes requested by the user and the minimum changes necessary to accomplish the objective.
* **No Unrelated Touches**: Do **not** modify unrelated files, unrelated features, formatting styles, or arbitrary code.
* **No Unsolicited Refactoring**: Avoid unsolicited cleanups, dependency reorganizations, or stylistic refactors.

---

### 3. Keep Documentation in Sync
* **Synchronized Updates**: If an approved change makes existing documentation inaccurate or incomplete, update the documentation as part of the current deliverable.
* **No Silent Decisions**: Never introduce an unapproved architectural decision or convention silently.
* **Resolve Divergence**: If an assigned task conflicts with existing documentation or necessitates a new decision, clearly explain the conflict and ask for user confirmation before proceeding.

---

### 4. Follow Approved Project Decisions
* **Standards & Architecture**: Abide by the latest approved project documentation, existing coding patterns, folder conventions, and established system design.
* **No Unauthorized Swaps**: Never substitute an approved library, tech stack choice, design token, or architecture pattern without explicit user consent.

---

### 5. Raise Conflicts and Missing Information
* **Conflict Identification**: If rules, documentation, and existing code disagree, explain the discrepancy in detail prior to making any decision that impacts system behavior or architecture.
* **Clear Labeling**: Explicitly label assumptions and proposed choices as proposals; never present unapproved assumptions as final decisions.

---

### 6. Plan Larger Changes
* **Pre-Execution Planning**: For work affecting multiple files, cross-cutting features, schemas, or architectural boundaries, provide a clear, concise plan first detailing:
  - Intended scope
  - Affected components and files
  - Step-by-step implementation order
* **Approval Gate**: Await explicit user approval before execution when required by the workflow.

---

### 7. Manage Dependencies Carefully
* **Minimal Dependencies**: Do not install, remove, or replace dependencies unless the task explicitly demands it.
* **Justification**: Provide a clear explanation for any dependency change and document it according to project conventions.

---

### 8. Verify Relevant Changes
* **Targeted Verification**: Run relevant project checks, linter runs, builds, or test suites covering modified code.
* **Honest Reporting**: Accurately report:
  - Which checks passed
  - Which checks failed
  - Which checks were skipped / not run
* **Zero Falsification**: Never declare or imply a change is tested or verified without actual execution.

---

### 9. Protect Sensitive Information
* **Zero Leaks**: Never expose, commit, or log sensitive data, including secrets, API keys, passwords, authentication tokens, credentials, or private customer/user data in code, documentation, logs, or reports.

---

### 10. Summarize Completed Work
Upon completing a task, provide a structured close-out summary covering:
1. **What Changed**: Concise summary of modified files and functionality.
2. **Documentation Updated**: Which docs/specs were added or aligned.
3. **Verification & Checks**: Commands executed and their status (passed/failed/skipped).
4. **Outstanding Items**: Any limitations, edge cases, follow-up recommendations, or known caveats.

---
