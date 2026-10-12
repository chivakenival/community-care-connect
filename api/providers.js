export default async function handler(req, res) {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/1w-Kd3iKTMgGS_SXRR5j3zIG4r7sOGc8rOfXrfY4HewU/export?format=csv&gid=0";
  try {
    const response = await fetch(sheetUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok) {
      return res.status(response.status).json({ error: `Google Sheets returned ${response.status}` });
    }
    const csv = await response.text();
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).send(csv);
  } catch (error) {
    return res.status(500).json({ error: "Unable to load provider data" });
  }
}
