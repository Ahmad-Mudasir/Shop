/**
 * Updates a URL search param while preserving all other existing params.
 * Pass value="" or undefined to DELETE the param.
 *
 * @param {URLSearchParams} searchParams - the current params object
 * @param {string} key                  - the param key to update
 * @param {string|number|undefined} value - the new value
 * @returns {URLSearchParams}           - a new URLSearchParams with the update applied
 */
export const updateUrlParam = (searchParams, key, value) => {
  const params = new URLSearchParams(searchParams.toString());
  if (value === "" || value === null || value === undefined) {
    params.delete(key);
  } else {
    params.set(key, value);
  }
  return params;
};

/**
 * Applies price range (min / max) to existing URL search params.
 * Uses the price[gte] / price[lte] format that the backend APIFilters expects.
 * Removes the keys when values are empty so stale filters don't persist.
 *
 * @param {URLSearchParams} searchParams
 * @param {string} min
 * @param {string} max
 * @returns {URLSearchParams}
 */
export const getPriceQueryParams = (searchParams, min, max) => {
  let params = new URLSearchParams(searchParams.toString());

  if (min !== "" && min !== undefined && min !== null) {
    params.set("price[gte]", min);
  } else {
    params.delete("price[gte]");
  }

  if (max !== "" && max !== undefined && max !== null) {
    params.set("price[lte]", max);
  } else {
    params.delete("price[lte]");
  }

  return params;
};
