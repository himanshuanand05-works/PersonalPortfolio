---
title: "Transactional Outbox Pattern: Eliminating Ghost Events in Event-Driven Systems"
description: "How duplicate and ghost events appear in distributed systems, and how the transactional outbox/inbox pattern with idempotency and resumable processing makes event delivery reliable."
date: 2026-09-18
tags: [Node.js, Kafka, Event-Driven, Reliability]
readingTime: 7 min read
---

In event-driven architectures, the same bug shows up in every postmortem: a payment event processed twice, a notification sent three times, a projection that silently drifts from the source of truth. These are *ghost events* — messages that appear, reappear, or arrive without a durable cause you can trace back.

## Why ghost events happen

The root cause is almost always the same: the database write and the message publish are two separate operations. If the service commits the transaction and then crashes before publishing, the state changed but nothing was emitted. If it publishes first and the transaction rolls back, the world hears about work that never happened. Retries and broker redelivery amplify both failure modes.

## The outbox pattern

Instead of publishing directly, the service writes the event to an **outbox table inside the same transaction** as the domain state change. A relay process reads the outbox and publishes to the broker, then marks entries as dispatched.

- Atomicity: the event exists if and only if the state change committed.
- At-least-once delivery: the relay can crash and resume without losing events.
- Ordering: events for an aggregate can be dispatched in commit order.

On the consumer side, the mirror pattern is the **inbox (idempotency) table**. Each incoming event carries a stable identifier; the consumer records processed identifiers and skips duplicates. Combined with resumable processing state — checkpoints describing exactly where a consumer stopped — recovery after a failure becomes a matter of replaying from the checkpoint rather than guessing.

## What this looked like in production

While working on distributed services at DBiz-AI, investigating duplicate and ghost event scenarios led to implementing transactional outbox/inbox with idempotency keys and resumable processing state. Paired with aggregate decomposition and CQRS-style read/write separation, the result was a platform where message delivery was auditable, recovery was deterministic, and database query time dropped by up to 50% in the heaviest paths.

## Takeaways

1. Never publish outside the transaction boundary — write to an outbox instead.
2. Make consumers idempotent with an inbox keyed on the event id.
3. Persist processing checkpoints so restarts resume instead of replay blindly.
4. Treat duplicate handling as a first-class design requirement, not an edge case.
