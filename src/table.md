erDiagram
    CATEGORIES ||--o{ ADDITIVES : "memiliki"
    PRODUCTS ||--o{ PRODUCT_ADDITIVES : "memuat"
    ADDITIVES ||--o{ PRODUCT_ADDITIVES : "terkandung_dalam"
    USERS ||--o{ SCAN_HISTORIES : "merekam"
    PRODUCTS ||--o{ SCAN_HISTORIES : "direferensikan_oleh"

    CATEGORIES {
        int id PK
        varchar name
        text description
        varchar icon_url
    }

    ADDITIVES {
        int id PK
        int category_id FK
        varchar name
        varchar alternative_names
        varchar ins_e_code
        varchar tech_function
        text simple_explanation
        text common_uses
        text safety_boundary
        text reference_source
    }

    PRODUCTS {
        int id PK
        varchar barcode UK
        varchar name
        varchar brand
        varchar category
        varchar image_url
        text raw_ingredients
        varchar data_source
        timestamp updated_at
    }

    PRODUCT_ADDITIVES {
        int id PK
        int product_id FK
        int additive_id FK
        varchar detected_via
    }

    USERS {
        int id PK
        varchar session_uuid UK
        varchar user_agent
        timestamp created_at
    }

    SCAN_HISTORIES {
        int id PK
        int user_id FK
        int product_id FK "nullable"
        varchar scan_method
        varchar scanned_barcode "nullable"
        text raw_ocr_text "nullable"
        json identified_additives "nullable"
        timestamp scanned_at
    }