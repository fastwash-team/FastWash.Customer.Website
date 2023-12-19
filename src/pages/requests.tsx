import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { WashItem } from "../utils/types";
import { WashItemComponent } from "../components/listItem";
import { EmptyContainer } from "../components/empty-wash-item-list";
import { useNavigate } from "react-router-dom";

export const Requests = () => {
  const [activeState, setActiveState] = useState("active");
  const [items, setItems] = useState<[] | WashItem[]>([]);
  const navigate = useNavigate();

  const fetchListByState = () => {
    if (activeState === "active") {
      setItems([]);
    }
    if (activeState === "completed") {
      setItems([
        {
          itemno: "09380",
          status: "received",
          date: "4th Oct",
          extras: ["One Wash", "Cleanser", "Softener", "No extra"],
        },
      ]);
    }
  };

  useEffect(() => {
    fetchListByState();
  }, [activeState]);

  return (
    <div className='__dashboard'>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6 col-sm-12'>
            <div className='_requests'>
              <i
                className='bi bi-arrow-left-short _back'
                onClick={() => navigate(-1)}
              />
              <h3>Requests</h3>
              <h6>List of all your FastWash requests</h6>
              <div className='menu-container-bg'>
                <li
                  onClick={() => setActiveState("active")}
                  className={`${activeState === "active" && "active"}`}
                >
                  Active
                </li>
                <li
                  onClick={() => setActiveState("completed")}
                  className={`${activeState === "completed" && "active"}`}
                >
                  Completed
                </li>
              </div>
              <div className='list-container'>
                {!items.length ? (
                  <EmptyContainer />
                ) : (
                  <WashItemComponent items={items} />
                )}
              </div>
            </div>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
    </div>
  );
};
