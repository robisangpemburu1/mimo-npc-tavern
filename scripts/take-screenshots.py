import asyncio
from playwright.async_api import async_playwright
import os

async def take_screenshots():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        
        # Load local HTML file
        html_path = os.path.abspath("screenshots-mockup.html")
        await page.goto(f"file://{html_path}", wait_until="networkidle")
        
        # Wait for content to load
        await page.wait_for_timeout(1000)
        
        # Screenshot 1: Homepage Hero
        card1 = await page.query_selector("#screenshot-1")
        if card1:
            await card1.screenshot(path="public/screenshots/1-homepage.png")
            print("✓ Screenshot 1: Homepage Hero")
        
        # Screenshot 2: NPC Cards
        card2 = await page.query_selector("#screenshot-2")
        if card2:
            await card2.screenshot(path="public/screenshots/2-npc-cards.png")
            print("✓ Screenshot 2: NPC Cards")
        
        # Screenshot 3: Chat Interface
        card3 = await page.query_selector("#screenshot-3")
        if card3:
            await card3.screenshot(path="public/screenshots/3-chat-interface.png")
            print("✓ Screenshot 3: Chat Interface")
        
        # Screenshot 4: Quest Generation
        card4 = await page.query_selector("#screenshot-4")
        if card4:
            await card4.screenshot(path="public/screenshots/4-quest-generation.png")
            print("✓ Screenshot 4: Quest Generation")
        
        # Screenshot 5: Moral Evaluation
        card5 = await page.query_selector("#screenshot-5")
        if card5:
            await card5.screenshot(path="public/screenshots/5-moral-evaluation.png")
            print("✓ Screenshot 5: Moral Evaluation")
        
        # Full page screenshot
        await page.screenshot(path="public/screenshots/full-mockup.png", full_page=True)
        print("✓ Full page screenshot")
        
        await browser.close()
        print("\n✅ All screenshots captured successfully!")

if __name__ == "__main__":
    asyncio.run(take_screenshots())
