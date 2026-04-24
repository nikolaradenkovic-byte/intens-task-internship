# Fullstack Web Application with API

<img width="1901" height="918" alt="Screenshot 2026-04-24 205107" src="https://github.com/user-attachments/assets/ad7fa4d5-82dc-4add-851f-d6fa8d536dcc" />

Full-stack aplikacija za upravljanje kandidatima za posao. Sistem omogućava potpunu kontrolu nad podacima o kandidatima kroz moderan web interfejs i pouzdan backend API.

## Tehnologije

### Frontend
* **Framework:** `React (Vite)`
* **CSS Framework:** `Bootstrap`
* **HTTP Klijent:** `Axios`
* **Routing:** `React Router DOM`

### Backend
* **Framework:** `Spring Boot`
* **ORM:** `Spring Data JPA`
* **Baza podataka:** `MySQL`
* **Testiranje:** `JUnit, Mockito`
* **Dokumentacija:** `Swagger (OpenAPI)`
* **Utility:** `Lombok`

---

## Dizajn i odluke


### 1. Arhitektura (Layered Architecture)
Backend je strukturiran u slojeve kako bi se postigla jasna podela odgovornosti (Separation of Concerns):
* **Controller:** Endpointi koji primaju HTTP zahteve i vracaju objekte.
* **Service:** Centralizovana logika.
* **Repository:** Apstrakcija baze podataka kroz JPA interfejse.

### 2. Testiranje
Fokus je stavljen na pouzdanost koda. Koriscen je `Mockito` za testiranje bez potrebe baze podataka, cime je omogućeno pisanje brzih i preciznih Unit testova. ***Ovaj deo aplikacije je bio najzanimljiviji iz razloga sto sam naucio JUnit i Mockito da koristim koji pre nisam znao.***

### 3. API Dokumentacija
Integrisan je `Swagger`.

---
