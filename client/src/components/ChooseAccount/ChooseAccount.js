import React, { useState, useEffect } from 'react';

function ChooseAccount({ accountType, onAccountSelect }) {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    const fetchAccounts = async () => {
        console.log(accountType);
        const response = await fetch(`/api/meta_api/${accountType}`);
        const data = await response.json();
        setAccounts(data);
    };

    useEffect(() => {
        fetchAccounts();
    }, [accountType]);

    const handleSave = () => {
        onAccountSelect(selectedAccountId);
    };

    return (
        <>
            <form>
                <fieldset>
                    <legend>Wybierz {accountType} konto</legend>
                    {accounts.map(account => (
                        <div key={account.id}>
                            <input 
                                type="radio" 
                                id={`account-${account.id}`} 
                                name="account" 
                                value={account.id} 
                                onChange={() => setSelectedAccountId(account.id)}
                            />
                            <label htmlFor={`account-${account.id}`}>
                                {account.id} - {!account.name ? account.username : account.name}
                            </label>
                        </div>
                    ))}
                </fieldset>
                <button type="button" onClick={handleSave}>Zapisz</button>
                <button type="button" onClick={() => onAccountSelect(null)}>Anuluj</button>
            </form>
        </>
    );
}

export default ChooseAccount;