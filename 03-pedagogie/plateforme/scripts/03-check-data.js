import { query, closePool } from "../src/db/connection.js";

const checks = [
  ["rules", "SELECT COUNT(*)::int AS c FROM rules"],
  ["exercises", "SELECT COUNT(*)::int AS c FROM exercises"],
  ["orphans", "SELECT COUNT(*)::int AS c FROM exercises e LEFT JOIN rules r ON e.rule_id = r.id WHERE r.id IS NULL"],
];

for (const [name, sql] of checks) {
  const r = await query(sql);
  console.log(`${name}: ${r.rows[0].c}`);
}

await closePool();
