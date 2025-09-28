
export const CATEGORY_PARENT_SUBCATEGORIES_QUERY = `
      SELECT
  c.id,
  c.image ,
  c."displayOrder",
  cc.id AS "categoryContentId",
  cc.name,
  cc.slug,
  cc.description,
  cc.language,
  
  p.id AS "parentId",
  p.image AS "parentImage",
  p."displayOrder" AS "parentDisplayOrder",
  pc.id AS "parentContentId",
  pc.name AS "parentName",
  pc.slug AS "parentSlug",
  pc.description AS "parentDescription",
  pc.language AS "parentLanguage",
  
  sc.id AS "subcategoryId",
  sc.image AS "subcategoryImage",
  sc."displayOrder" AS "subcategoryDisplayOrder",
  scc.id AS "subcategoryContentId",
  scc.name AS "subcategoryName",
  scc.slug AS "subcategorySlug",
  scc.description AS "subcategoryDescription",
  scc.language AS "subcategoryLanguage"

FROM "Category" c



-- Join category translations
LEFT JOIN "CategoryContent" cc ON cc."categoryId" = c.id

-- Join parent category and its translations
LEFT JOIN "Category" p ON c."parentCategoryId" = p.id
LEFT JOIN "CategoryContent" pc ON pc."categoryId" = p.id

-- Join subcategories and their translations
LEFT JOIN "Category" sc ON sc."parentCategoryId" = c.id
LEFT JOIN "CategoryContent" scc ON scc."categoryId" = sc.id

WHERE c."parentCategoryId" IS NULL
ORDER BY c."displayOrder", sc."displayOrder";

`;
