import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { API_BASE_URL } from '../../utilities/api';

/**
 * Landing page for the unsubscribe link in competition announcements.
 *
 * Unsubscribing happens on load so the link does what it promises in one
 * click, and the undo is offered immediately - a misclick should not cost
 * someone their competition notifications.
 */
function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [state, setState] = useState('working');
  const [firstName, setFirstName] = useState('');

  const change = useCallback(
    async (endpoint, nextState) => {
      setState('working');
      try {
        const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          setState(response.status === 404 ? 'unknown' : 'error');
          return;
        }

        const data = await response.json();
        setFirstName(data.first_name || '');
        setState(nextState);
      } catch {
        setState('error');
      }
    },
    [token]
  );

  useEffect(() => {
    if (!token) {
      setState('unknown');
      return;
    }
    change('unsubscribe', 'unsubscribed');
  }, [token, change]);

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-16">
      {state === 'working' && (
        <p className="text-center text-slate-500">Käsitellään...</p>
      )}

      {state === 'unsubscribed' && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <FaCheckCircle className="mx-auto text-4xl text-emerald-600" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Tilaus peruutettu</h1>
          <p className="mt-3 text-slate-600">
            {firstName ? `${firstName}, et ` : 'Et '}
            saa enää sähköpostia tulevista kilpailuista.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Jäsenyytesi jatkuu normaalisti. Yhdistyksen kokouskutsut ja jäsenyyttä koskevat
            viestit lähetetään edelleen.
          </p>
          <button
            type="button"
            onClick={() => change('resubscribe', 'resubscribed')}
            className="mt-6 rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Peruutin vahingossa — tilaa uudelleen
          </button>
        </div>
      )}

      {state === 'resubscribed' && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <FaCheckCircle className="mx-auto text-4xl text-emerald-600" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Tilaus palautettu</h1>
          <p className="mt-3 text-slate-600">
            Saat jatkossakin ilmoitukset uusista kilpailuista Suomessa.
          </p>
          <button
            type="button"
            onClick={() => change('unsubscribe', 'unsubscribed')}
            className="mt-6 rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Peruuta tilaus
          </button>
        </div>
      )}

      {(state === 'unknown' || state === 'error') && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-8 text-center">
          <FaExclamationTriangle className="mx-auto text-4xl text-amber-600" />
          <h1 className="mt-4 text-2xl font-bold text-amber-900">
            {state === 'unknown' ? 'Linkki ei kelpaa' : 'Jotain meni pieleen'}
          </h1>
          <p className="mt-3 text-amber-900">
            {state === 'unknown'
              ? 'Linkki on vanhentunut tai virheellinen. Ota yhteyttä, niin hoidamme asian.'
              : 'Yhteys palvelimeen epäonnistui. Yritä hetken kuluttua uudelleen.'}
          </p>
          <a href="/contact" className="mt-6 inline-block font-semibold text-brand-secondary underline">
            Ota yhteyttä
          </a>
        </div>
      )}
    </div>
  );
}

export default Unsubscribe;
