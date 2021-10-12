import asyncio
import asyncpg

async def run():
    conn = await asyncpg.connect(user='haesun', password='123',
                                 database='ourunsw', host='127.0.0.1')
    values = await conn.fetch(
        "SELECT * FROM students WHERE student_id = 'z5555551'",
    )
    print(values)
    await conn.close()
    
loop = asyncio.get_event_loop()
loop.run_until_complete(run())