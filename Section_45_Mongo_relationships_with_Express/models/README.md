## Farm Model Design Notes

### Relationship Choice: One-to-Many (Reference)
- **Why not embedding?** Products could be hundreds per farm → embedding would cause document bloat
- **Why not separate collection only?** Need to frequently show farm with its products → referencing + populate is perfect

### Virtual Property: `productCount`
- Not stored in DB (saves space)
- Calculated on demand from `products` array length
- Perfect for display without extra query

### Methods Added:
1. **Static**: `findOrganicFarms()` - utility for common query
2. **Instance**: `addSampleProducts()` - demo method for seeding

### Indexes to Add Later:
- `name: 1` (unique index already)
- `isOrganic: 1` for filtering organic farms