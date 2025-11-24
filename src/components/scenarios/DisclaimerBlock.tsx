export function DisclaimerBlock() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚕️</span>
        <div>
          <h4 className="font-semibold text-amber-800 mb-2">Важливе застереження</h4>
          <p className="text-amber-700 text-sm">
            Цей аналіз є інформаційним і не замінює консультацію лікаря. 
            Для точної діагностики та лікування зверніться до спеціаліста.
            При гострих симптомах (біль у грудях, сильна задуха) — негайно викликайте швидку.
          </p>
        </div>
      </div>
    </div>
  );
}