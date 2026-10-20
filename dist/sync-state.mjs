// Merge only states known to belong to the same UID. Account switches never call this with the previous user's state.
export function mergeProgress(local,remote){if(!local)return remote;if(!remote)return local;return {...local,starts:[...new Set([...remote.starts,...local.starts])],earned:[...new Set([...remote.earned,...local.earned])],shiny:[...new Set([...remote.shiny,...local.shiny])]};}
