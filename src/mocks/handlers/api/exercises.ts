
import { http, HttpResponse } from "msw"

export const exercisesHandlers = [

    http.get('http://localhost:8080/api/exercises', ({ request }) => {
        // console.log('✅ MSW Intercepted:', request);
        return HttpResponse.json([
            {
                "id": "9883fd44-0c9a-4f31-a103-b80336d3ca9d",
                "createdAt": "2025-02-20T13:59:13.402458",
                "updatedAt": "2025-02-20T13:59:13.568015",
                "name": "MBR Décembre 2024",
                "year": 2024,
                "status": "IN_PROGRESS",
                "description": null,
                "creator": {
                    "id": "b1dc5e94-c1eb-4cdf-9a88-4bae0bbcbb45",
                    "createdAt": null,
                    "updatedAt": null,
                    "email": "steerlinx@ocp.ma",
                    "firstName": "SteerLinx",
                    "lastName": null,
                    "profileImage": null,
                    "lastLogin": null,
                    "sbu": {
                        "id": "de5af152-09ae-4876-89f2-d687e2abba91",
                        "createdAt": null,
                        "updatedAt": null,
                        "name": "Corporate"
                    },
                    "profile": null
                },
                "exerciseType": {
                    "id": "bb292489-e1c6-4c79-9a97-fec59299d18d",
                    "createdAt": null,
                    "updatedAt": null,
                    "name": "MBR",
                    "monthOffset": 2,
                    "horizon": "Mensuel"
                },
                "parentPeriod": {
                    "id": "781c65bc-1bcb-455b-9542-89327ba22901",
                    "createdAt": null,
                    "updatedAt": null,
                    "name": "Décembre",
                    "sortedBy": 17,
                    "startMonth": 12,
                    "startDay": 1,
                    "children": []
                },
                "periods": [
                    {
                        "id": {
                            "exerciseId": "9883fd44-0c9a-4f31-a103-b80336d3ca9d",
                            "periodId": "e6c2dcdb-e84c-461c-b9d1-cbb818e69212"
                        },
                        "period": {
                            "id": "e6c2dcdb-e84c-461c-b9d1-cbb818e69212",
                            "createdAt": null,
                            "updatedAt": null,
                            "name": "Février",
                            "sortedBy": 7,
                            "startMonth": 2,
                            "startDay": 1,
                            "children": []
                        },
                        "year": 2025
                    },
                    {
                        "id": {
                            "exerciseId": "9883fd44-0c9a-4f31-a103-b80336d3ca9d",
                            "periodId": "b27de3aa-d863-4036-8604-15186ed769c8"
                        },
                        "period": {
                            "id": "b27de3aa-d863-4036-8604-15186ed769c8",
                            "createdAt": null,
                            "updatedAt": null,
                            "name": "Janvier",
                            "sortedBy": 6,
                            "startMonth": 1,
                            "startDay": 1,
                            "children": []
                        },
                        "year": 2025
                    },
                    {
                        "id": {
                            "exerciseId": "9883fd44-0c9a-4f31-a103-b80336d3ca9d",
                            "periodId": "781c65bc-1bcb-455b-9542-89327ba22901"
                        },
                        "period": {
                            "id": "781c65bc-1bcb-455b-9542-89327ba22901",
                            "createdAt": null,
                            "updatedAt": null,
                            "name": "Décembre",
                            "sortedBy": 17,
                            "startMonth": 12,
                            "startDay": 1,
                            "children": []
                        },
                        "year": 2024
                    }
                ],
                "steps": [
                    {
                        "id": "d65c8317-70a9-43b5-86b2-d925c1f24944",
                        "createdAt": "2025-02-20T13:59:13.418734",
                        "updatedAt": "2025-02-20T13:59:13.418734",
                        "status": "INACTIVE",
                        "deadlineAt": null,
                        "stepConfig": {
                            "id": "16e0a214-2fe3-42d1-8a9b-8a9db6b1e61c",
                            "createdAt": null,
                            "updatedAt": null,
                            "name": "Arbitrage & Validation",
                            "code": "VALIDATION",
                            "iconKey": null,
                            "sortedBy": 5,
                            "deadlineDay": null,
                            "mandatory": false,
                            "sbus": [
                                {
                                    "id": "0a218efb-87e8-4bfc-aad9-d195a4e29d43",
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "name": "Mining"
                                }
                            ]
                        },
                        "subSteps": []
                    },
                    {
                        "id": "80675bd4-7d3f-40be-b2bf-b437027941d2",
                        "createdAt": "2025-02-20T13:59:13.418203",
                        "updatedAt": "2025-02-20T13:59:13.568131",
                        "status": "IN_PROGRESS",
                        "deadlineAt": "2024-12-18T00:00:00",
                        "stepConfig": {
                            "id": "ef7ca7c5-7ff3-4e01-99f8-647fb3ffc93b",
                            "createdAt": null,
                            "updatedAt": "2025-02-23T11:27:53.872383",
                            "name": "Hypothèses Manufacuring",
                            "code": "HYP_MANU",
                            "iconKey": "layout-list",
                            "sortedBy": 1,
                            "deadlineDay": 18,
                            "mandatory": true,
                            "sbus": [
                                {
                                    "id": "e42e7f19-757e-4489-bf7b-9b3c3f1d6275",
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "name": "Manufacturing"
                                }
                            ]
                        },
                        "subSteps": [
                            {
                                "id": "230eaecd-9a37-4dae-abec-be746955eaaf",
                                "name": "Collect",
                                "description": "Collecte de données brutes",
                                "icon": "LayoutList",
                                "status": "IN_PROGRESS",
                                "code": "COLLECT",
                                "sortedBy": 1,
                                "createdAt": "2025-02-20T13:59:13.418293",
                                "updatedAt": "2025-02-20T13:59:13.418293"
                            },
                            {
                                "id": "7e277260-3b8d-4334-9f34-daae474357f0",
                                "name": "Consolidation & visualisation",
                                "description": "Consolidation et visualisation de données",
                                "icon": "ChartNoAxesCombined",
                                "status": "INACTIVE",
                                "code": "CONSOLIDATION",
                                "sortedBy": 2,
                                "createdAt": "2025-02-20T13:59:13.418381",
                                "updatedAt": "2025-02-20T13:59:13.418381"
                            }
                        ]
                    },
                    {
                        "id": "fac3d292-4626-4396-8906-ff4809a47bd2",
                        "createdAt": "2025-02-20T13:59:13.418839",
                        "updatedAt": "2025-02-20T13:59:13.568193",
                        "status": "INACTIVE",
                        "deadlineAt": "2024-12-22T00:00:00",
                        "stepConfig": {
                            "id": "1845e2c9-2500-4a17-bb11-a98d1735cded",
                            "createdAt": null,
                            "updatedAt": "2025-02-23T11:27:53.872471",
                            "name": "Ajustement des hypothèses Manufacturing",
                            "code": "HYP_MANU_ADJ",
                            "iconKey": "sliders-horizontal",
                            "sortedBy": 3,
                            "deadlineDay": 22,
                            "mandatory": true,
                            "sbus": [
                                {
                                    "id": "e42e7f19-757e-4489-bf7b-9b3c3f1d6275",
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "name": "Manufacturing"
                                }
                            ]
                        },
                        "subSteps": [
                            {
                                "id": "6ee9f5ab-48ce-4e90-adf8-2666c3715ad4",
                                "name": "Collect",
                                "description": "Collecte de données brutes",
                                "icon": "LayoutList",
                                "status": "IN_PROGRESS",
                                "code": "COLLECT",
                                "sortedBy": 1,
                                "createdAt": "2025-02-20T13:59:13.418937",
                                "updatedAt": "2025-02-20T13:59:13.418937"
                            },
                            {
                                "id": "8be5a5ac-9962-42e3-bde5-eac1ca1e6ebe",
                                "name": "Consolidation & visualisation",
                                "description": "Consolidation et visualisation de données",
                                "icon": "ChartNoAxesCombined",
                                "status": "INACTIVE",
                                "code": "CONSOLIDATION",
                                "sortedBy": 2,
                                "createdAt": "2025-02-20T13:59:13.419032",
                                "updatedAt": "2025-02-20T13:59:13.419032"
                            },
                            {
                                "id": "40f5ec9e-108a-4147-a2a7-1df0f95a9e89",
                                "name": "Scénarisation",
                                "description": "Scénarisation de données consolidées",
                                "icon": "ChartNoAxesCombined",
                                "status": "INACTIVE",
                                "code": "SCENARISATION",
                                "sortedBy": 3,
                                "createdAt": "2025-02-20T13:59:13.419132",
                                "updatedAt": "2025-02-20T13:59:13.419132"
                            }
                        ]
                    },
                    {
                        "id": "a9049a68-3d28-4481-8c14-261fb064ba31",
                        "createdAt": "2025-02-20T13:59:13.417616",
                        "updatedAt": "2025-02-20T13:59:13.417616",
                        "status": "INACTIVE",
                        "deadlineAt": "2024-12-25T00:00:00",
                        "stepConfig": {
                            "id": "450052c4-62fb-4c53-b88c-cb9f059792c8",
                            "createdAt": null,
                            "updatedAt": null,
                            "name": "Scénarisation",
                            "code": "SCENARISATION",
                            "iconKey": null,
                            "sortedBy": 4,
                            "deadlineDay": 25,
                            "mandatory": true,
                            "sbus": [
                                {
                                    "id": "0a218efb-87e8-4bfc-aad9-d195a4e29d43",
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "name": "Mining"
                                }
                            ]
                        },
                        "subSteps": []
                    },
                    {
                        "id": "b948ffca-5588-4146-b609-9bf8543c2aba",
                        "createdAt": "2025-02-20T13:59:13.418511",
                        "updatedAt": "2025-02-20T13:59:13.418511",
                        "status": "INACTIVE",
                        "deadlineAt": null,
                        "stepConfig": {
                            "id": "3a44ca3a-a9b1-416e-a778-572fb130b53b",
                            "createdAt": null,
                            "updatedAt": null,
                            "name": "Reporting",
                            "code": "REPORT",
                            "iconKey": null,
                            "sortedBy": 6,
                            "deadlineDay": null,
                            "mandatory": false,
                            "sbus": [
                                {
                                    "id": "0a218efb-87e8-4bfc-aad9-d195a4e29d43",
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "name": "Mining"
                                }
                            ]
                        },
                        "subSteps": []
                    },
                    {
                        "id": "d2565fa7-a54c-492c-8aad-bce6c4413ba2",
                        "createdAt": "2025-02-20T13:59:13.417725",
                        "updatedAt": "2025-02-20T13:59:13.56808",
                        "status": "INACTIVE",
                        "deadlineAt": "2024-12-20T00:00:00",
                        "stepConfig": {
                            "id": "228f59ac-b16d-4161-a826-94cfe8c9d9ac",
                            "createdAt": null,
                            "updatedAt": "2025-02-23T11:27:53.872522",
                            "name": "TopLine & UpSide",
                            "code": "HYP_SALES",
                            "iconKey": "layout-list",
                            "sortedBy": 2,
                            "deadlineDay": 20,
                            "mandatory": true,
                            "sbus": [
                                {
                                    "id": "49e00608-f1bb-4e09-b350-e482eeeea7e4",
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "name": "Rock solutions"
                                }
                            ]
                        },
                        "subSteps": [
                            {
                                "id": "59e80ee1-ad6d-4d9b-895f-b9d5e4cbdfd5",
                                "name": "Collect",
                                "description": "Collecte de données brutes",
                                "icon": "LayoutList",
                                "status": "IN_PROGRESS",
                                "code": "COLLECT",
                                "sortedBy": 1,
                                "createdAt": "2025-02-20T13:59:13.417818",
                                "updatedAt": "2025-02-20T13:59:13.417818"
                            },
                            {
                                "id": "7b37e87c-1ea3-44a8-b9ef-19bddf05fcae",
                                "name": "Consolidation & visualisation",
                                "description": "Consolidation et visualisation de données",
                                "icon": "ChartNoAxesCombined",
                                "status": "INACTIVE",
                                "code": "CONSOLIDATION",
                                "sortedBy": 2,
                                "createdAt": "2025-02-20T13:59:13.417998",
                                "updatedAt": "2025-02-20T13:59:13.417998"
                            },
                            {
                                "id": "8ad88685-9d2a-480e-bc60-6f5f8328576a",
                                "name": "Scénarisation",
                                "description": "Scénarisation de données consolidées",
                                "icon": "ChartNoAxesCombined",
                                "status": "INACTIVE",
                                "code": "SCENARISATION",
                                "sortedBy": 3,
                                "createdAt": "2025-02-20T13:59:13.41808",
                                "updatedAt": "2025-02-20T13:59:13.41808"
                            }
                        ]
                    }
                ]
            },
        ], { status: 200 });
    }),


]






