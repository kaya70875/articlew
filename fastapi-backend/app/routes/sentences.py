from fastapi import APIRouter, HTTPException, Query
from app.models.database import sentences_collection

router = APIRouter()

@router.get("/sentences/{word}")
async def get_sentences(
    word: str,
    categories: list[str] = Query(None),
    min_length: int = Query(None, description="Minimum sentence length"),
    max_length: int = Query(None, description="Maximum sentence length"),
    sort_by: str = Query(None, description="Sort field (e.g., 'length' or 'created_at')"),
    order: str = Query("asc", description="Sort order: 'asc' for ascending, 'desc' for descending")
):
    """
    Get sentences containing the word, optionally filtered by categories, length, and sorted.
    """

    # Base filter to search for the word in sentences
    filter_query = {'text': {'$regex': word, '$options': 'i'}}

    # Add categories to the filter if provided
    if categories:
        filter_query['category'] = {'$in': categories}
    
    if categories and not isinstance(categories, list):
        categories = [categories]

    # Add length filters if provided
    if min_length is not None or max_length is not None:
        filter_query['length'] = {}
        if min_length is not None:
            filter_query['length']['$gte'] = min_length
        if max_length is not None:
            filter_query['length']['$lte'] = max_length

    # Query the database with the filter
    cursor = sentences_collection.find(filter_query, {'_id': 0})

    # Apply sorting if specified
    if sort_by:
        sort_order = 1 if order == "asc" else -1
        cursor = cursor.sort(sort_by, sort_order)

    # Get the results as a list
    results = list(cursor)

    # Handle no results
    if not results:
        raise HTTPException(status_code=404, detail="No sentences found for the given word and filters")

    return {
        'word': word,
        'categories': categories,
        'min_length': min_length,
        'max_length': max_length,
        'sort_by': sort_by,
        'order': order,
        'sentences': results
    }
