export const apiVersion = ((): string => {
  const raw = (process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01').replace(/['"]/g, '').trim();
  // Ensure it matches YYYY-MM-DD or is exactly '1'
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw) || raw === '1') {
    return raw;
  }
  return '2024-01-01'; // Guaranteed safe fallback
})();

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
