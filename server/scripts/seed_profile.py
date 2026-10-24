import asyncio, json, asyncpg

async def main():
    data = json.load(open("seed/portfolio.json", encoding="utf-8"))
    merged = {}
    for entry in data:
        merged.update(entry.get("profile_sections", {}))
    conn = await asyncpg.connect("postgresql://postgres:m7B7e7ABjn_TRceAZnMbS8UZfTko3d7d@db.nylmlnszdkvsshnojxkb.supabase.co:5432/postgres")
    for key, val in merged.items():
        await conn.execute(
            "INSERT INTO profile_sections (key, data) VALUES ($1, $2::jsonb) "
            "ON CONFLICT (key) DO UPDATE SET data=$2::jsonb, updated_at=now()",
            key, json.dumps(val),
        )
        print("upserted", key)
    print("total", len(merged))
    await conn.close()

asyncio.run(main())
