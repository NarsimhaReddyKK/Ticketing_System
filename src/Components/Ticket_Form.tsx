import { useState } from "react"
import "./styles/Ticket_Form.css"
import { Header } from "./header";
import api from "../api/axios";

type TicketForm_Prop = {
    admin: string|null;
}

export const Ticket_Form = ({ admin }: TicketForm_Prop) => {
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const send = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const res = await api.post(
                "/tickets/",
                {
                    title: title,
                    description: desc,
                },
                {
                    withCredentials: true,
                }
            );
            console.log("Ticket created:", res.data);

            setTitle("");
            setDesc("");
            setStatus("");

            alert("Ticket created successfully");

        } catch (err: any) {
            if (err.response?.status === 401) {
                alert("You must be logged in");
            } else {
                alert("Failed to create ticket");
                console.error(err);
            }
        }
    };


    return (
        <>
            <Header admin={admin} />
            <div className="form__container">
                <form onSubmit={send} className="form">
                    <fieldset>
                        <legend className="form__legend"><h1>Ticket Form</h1></legend>
                        <p className="form__p">
                            <label className="form__label" htmlFor="title">Title:</label>
                            <input className="form__input" required value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Enter the title of the Ticket" />
                        </p>
                        <p className="form__p">
                            <label className="form__label" htmlFor="desc">Description: </label>
                            <input type="text" className="form__input" value={desc} onChange={(e) => { setDesc(e.target.value) }} placeholder="Enter the description of the Ticket" />
                        </p>
                        <p className="form__p">
                            <label htmlFor="status" className="form__label">Status: </label>
                            <select name="status" value={status} onChange={(e) => { setStatus(e.target.value) }} className="form__input-select">
                                <option className="form__option" value="">Set status of Ticket</option>
                                <option className="form__option" value="OPEN">Open</option>
                                <option className="form__option" value="IN_PROGRESS">In Progress</option>
                                <option className="form__option" value="RESOLVED">Resolved</option>
                            </select>
                        </p>
                        <p className="form__p">
                            <button className="form__button" type="submit">Send</button>
                        </p>
                    </fieldset>
                </form>
            </div>
        </>
    )
}
