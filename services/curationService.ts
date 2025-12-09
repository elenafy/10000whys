
/**
 * Service to handle logging of unserved search queries to the curation pipeline.
 * 
 * BACKEND LOGIC SPECIFICATION:
 * ----------------------------
 * Table: curation_requests
 * Columns: 
 *   - id: UUID (PK)
 *   - query_text: VARCHAR (Normalized)
 *   - timestamp: TIMESTAMPTZ
 *   - source: VARCHAR
 *   - count: INT (Default 1)
 * 
 * Logic:
 *   INSERT INTO curation_requests (query_text, source, timestamp)
 *   VALUES ($1, 'search', NOW())
 *   ON CONFLICT (query_text) 
 *   DO UPDATE SET count = curation_requests.count + 1, timestamp = NOW();
 */

export const logCurationRequest = async (query: string): Promise<void> => {
    // Normalize query
    const normalizedQuery = query.trim().toLowerCase();
    
    if (!normalizedQuery) return;
  
    // MOCK API CALL
    // In a real environment, this would be: await api.post('/curation/log', { query });
    console.group('📝 Curation Request Logged');
    console.log('Query:', normalizedQuery);
    console.log('Source:', 'search');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Action:', 'Sent to curation pipeline for review.');
    console.groupEnd();
  
    // Optional: Store in localStorage to prevent spamming the log in the same session
    const key = `logged_query_${normalizedQuery}`;
    if (sessionStorage.getItem(key)) {
        return; // Already logged this session
    }
    sessionStorage.setItem(key, 'true');
};
